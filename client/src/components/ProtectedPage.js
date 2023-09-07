import { Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/user";
import { useNavigate } from "react-router-dom";
import { getLoggedInUsers } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { setLoading } from "../redux/loadersSlice";

function ProtectedPage({ children ,userType }) {
  const { currentUser } = useSelector((state) => state.users); // from reducer
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetCurrentUser();
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(setCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(true));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    currentUser && (
      <div >
      <div >
        {/* header */}
        <div className="bar flex justify-between items-center text-white px-5 py-3 mx-5 rounded-b">
          <div onClick={()=>navigate('/')} className="cursor-pointer">
          <Tooltip title="HOME" >
          <h1 className="text-2xl tt">{`LIFE SAVERS - BLOOD BANK`}</h1>
            <span className="text-xs">
              {currentUser.userType.toUpperCase()}
            </span>
          </Tooltip>
          </div>
          <div className="flex items-center">
            <i class="ri-shield-user-fill p-3"></i>
            <Tooltip title = {`${currentUser.userType === 'donar' ? 'YOUR DONATIONS' : currentUser.userType==='hospital' ? 'YOUR REQUESTS' :'YOUR INVENTORY'}`} >
            <div className="flex flex-col">
              <span className="mr-5 text-md cursor-pointer" 
              onClick={()=>navigate('/profile')}
              >
                {getLoggedInUsers(currentUser).toUpperCase()}
              </span>
            </div>
            </Tooltip>
            <div>
            <Tooltip title="LOGOUT" >
              <i className=" ri-logout-circle-r-line ml-5 cursor-pointer"
                  onClick={()=>{localStorage.removeItem('token');
                  navigate('/login')
                 }}
            >
              </i>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* body */}
        <div className=" px-5 py-5">{children}</div>
      </div>
      </div>
    )
  );
}

export default ProtectedPage;
