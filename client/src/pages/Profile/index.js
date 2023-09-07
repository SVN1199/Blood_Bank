import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donars from "./Donars";
import Hospitals from "./Hospitals";
import Organisations from "./Organisation";
import InventoryTable from "../../components/InventoryTable";
function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div >
      <Tabs>
        {currentUser.userType === "organisation" && (
          <>
            <Tabs.TabPane tab="INVENTORY" key="1">
                <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="DONORS" key="2">
              <Donars/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="HOSPITALS" key="3">
              <Hospitals/>
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType ==='donar' && (
          <>
          <Tabs.TabPane tab="DONATIONS" key="4" >
          <InventoryTable 
                filters={{
                  inventoryType : "in",
                  donar : currentUser._id
                }}
                userType="donar"
                
              />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ORGANIZATIONS" key="5">
            <Organisations 
            userType="donar"
            />
          </Tabs.TabPane>
        </>
        )}

      {currentUser.userType ==='hospital' && (
          <>
          <Tabs.TabPane tab="CONSUMPTIONS" key="6">
              <InventoryTable 
                filters={{
                  inventoryType : "out",
                  hospital : currentUser._id
                }}
                userType="hospital"
              />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ORGANIZATIONS" key="7">
            <Organisations userType="hospital"/>
          </Tabs.TabPane>
        </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
