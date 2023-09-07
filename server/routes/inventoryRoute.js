const router = require("express").Router();
const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

// add inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // validate email and inventory type
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Email");

    if (req.body.inventoryType === "in" && user.userType !== "donar")
      throw new Error("This Email is not register as a donar");

    if (req.body.inventoryType === "out" && user.userType !== "hospital")
      throw new Error("This Email is not register as a hospital");

    if (req.body.inventoryType === "out") {
      // check if inventory is available
      const requestedGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      const totalInOfRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log(totalInOfRequestedGroup);

      const totalIn = totalInOfRequestedGroup[0].total || 0;


      const totalOutOfRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = totalOutOfRequestedGroup[0]?.total || 0;
      
      const availableQunaitytOfRequestedGroup = totalIn - totalOut

      if(availableQunaitytOfRequestedGroup < requestedQuantity)
        throw new Error(`Only ${availableQunaitytOfRequestedGroup} units of ${requestedGroup} blood is available`)

      req.body.hospital = user._id;
    } else {
      req.body.donar = user._id;
    }

    // add Inventory
    const inventory = new Inventory(req.body);
    await inventory.save();

    return res.send({ success: true, message: "Inventory Added Successfully" });
  } catch (error) {
    return res.send({ success: false, message: `Requested Blood is not Available` });
  }
});

// get Inventory
router.get("/get", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find({ organisation: req.body.userId }).sort({createdAt:-1})
      .populate("donar")
      .populate("hospital");
    return res.send({ success: true, data: inventory });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});


// get Inventory
router.post("/filter", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters).limit(req.body.limit || 10)
      .sort({createdAt:-1})
      .populate("donar")
      .populate("hospital").populate("organisation");
    return res.send({ success: true, data: inventory });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
