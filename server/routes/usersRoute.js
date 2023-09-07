const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require('../models/inventoryModel');
const { default: mongoose } = require("mongoose");

// register new user
router.post("/register", async(req, res) => {
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save user
    const user = new User(req.body);
    await user.save();

    return res.send({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
     return res.send({
        success: false,
        message: "User not found",
      });
    }
    // check if userType matches
    if(user.userType !== req.body.userType){
      return res.send({
        success : false,
        message : `User is not Registerd as a ${req.body.userType}`
      })
    } 

    // compare password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if(!validPassword){
       return res.send({
            success: false,
            message: "Enter Valid Email or Password",
          });
    }

    // generate token
    const token = jwt.sign(
        {userId : user._id},
        process.env.jwt_secret,
        {expiresIn : '50d'}
    )
    return res.send({
        success : true,
        message : 'User logged in successfully',
        data : token
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user
router.get('/get-current-user', authMiddleware, async(req,res)=>{
  try {
    const user = await User.findOne({_id : req.body.userId})
    return res.send({
      success : true,
      message : "User fetched Successfully",
      data : user,
    });

  } catch (error) {
    return res.send({
      success : false,
      message : error.message
    })
  }
})


// get all unique donars
router.get('/get-all-donars', authMiddleware, async(req,res)=>{
  try {
    // get all unique donar ids from an inventory
    const organisation = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueDonarIds = await Inventory.distinct("donar",{
      organisation
    })

    const donars = await User.find({
      _id : {$in : uniqueDonarIds}
    })

    return res.send({
      success : true,
      message : "Donars Fetched Successfully",
      data : donars
    })
 
  } catch (error){
    res.send({
    success : false,
    message : error.message
  })}
})

// get all unique hospitals
router.get('/get-all-hospitals', authMiddleware, async(req,res)=>{
  try {
    // get all unique hospital ids from an inventory
    const organisation = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueHospitalIds = await Inventory.distinct("hospital",{
      organisation
    })

    const hospitals = await User.find({
      _id : {$in : uniqueHospitalIds}
    })

    return res.send({
      success : true,
      message : "Hospitals Fetched Successfully",
      data : hospitals
    })
 
  } catch (error){
    res.send({
    success : false,
    message : error.message
  })}
})

// get all unique organisation for a donar
router.get('/get-all-organisations-of-a-donar', authMiddleware, async(req,res)=>{
  try {
    // get all unique hospital ids from an inventory
    const donar = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueOrganisationIds = await Inventory.distinct("organisation",{
      donar
    })

    const hospitals = await User.find({
      _id : {$in : uniqueOrganisationIds}
    })

    return res.send({
      success : true,
      message : "Organisation Fetched Successfully",
      data : hospitals
    })
 
  } catch (error){
    res.send({
    success : false,
    message : error.message
  })}
})
// 

// get all unique organisation for a hospital
router.get('/get-all-organisation-of-a-hospital', authMiddleware, async(req,res)=>{
  try {
    // get all unique organisations ids from an inventory
    const hospital = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueOrganisationIds = await Inventory.distinct("organisation",{
      hospital
    })

    const hospitals = await User.find({
      _id : {$in : uniqueOrganisationIds}
    })

    return res.send({
      success : true,
      message : "Organisation Fetched Successfully",
      data : hospitals
    })
 
  } catch (error){
    res.send({
    success : false,
    message : error.message
  })}
})








module.exports = router