import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBloodGroupInventory } from "../../apicalls/dashboard";
import { setLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { getLoggedInUsers } from "../../utils/helper";
import InventoryTable from "../../components/InventoryTable";

function Home() {
  const { currentUser } = useSelector((state) => state.users);
  const [bloodGroupData = [], setBloodGroupData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllBloodGroupInventory();
      dispatch(setLoading(false));
      if (response.success) {
        setBloodGroupData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const color = [
    "#F6358A",
    "#F6358A",
    "#F6358A",
    "#F6358A",
    "#F6358A",
    "#F6358A",
    "#F6358A",
    "#F6358A",
   
  ];

  return (
    <div>
      {currentUser.userType === "organisation" && (
        <>
          <div className="grid grid-cols-4 gap-5 mb-5 mt-2 cursor-pointer ">
            {bloodGroupData.map((bloodGroup, index) => {
              const colors = color[index];
              return (
                <div
                  className={`p-5 flex justify-between text-white rounded-xl items-center box  `}
                  style={{ backgroundColor: colors }}
                >
                  <h1 className="text-5xl uppercase">
                    {bloodGroup.bloodGroup}
                  </h1>
                  <div className="text">
                  <div className="flex flex-col justify-between gap-2 text">
                    <div className="flex justify-between gap-5 ">
                      <span>TOTAL IN</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>TOTAL OUT</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>AVAILABLE</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
          <span className="text-xl text-gray-700 font-semibold heading">
            YOUR RECENT INVENTORY
          </span>
          <InventoryTable
            filters={{
              organisation: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </>
      )}
      {currentUser.userType === "donar" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold heading">
            YOUR RECENT DONATIONS
          </span>
          <InventoryTable
            filters={{
              donar: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}

{currentUser.userType === "hospital" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold heading ">
            YOUR RECENT REQUESTS / CONSUMPTIONS
          </span>
          <InventoryTable
            filters={{
             hospital : currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
