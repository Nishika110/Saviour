import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicall/users";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice"
import { useNavigate } from "react-router-dom";
function ProtectedPage({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
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
    {/* header */}
     <div className="flex justify-between items-center bg-secondary text-white px-5 py-3">
        <div>
          <h1 className="text-2xl">
            SAVIOUR BLOODBANK
          </h1>
          
          <span className="text-xs margin-5">{currentUser.userType}</span>
          </div>

        <div className="flex items-center gap-1">
        <i className="ri-user-3-line"></i>
        <div className="flex flex-col ml-0" ><span className="mr-5 text-md cursor-pointer" onClick={()=>navigate("/profile")}>{getLoggedInUserName(currentUser)}</span>
          </div>
        <i className="ri-logout-circle-r-line ml-5 cursor-pointer" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}></i>
        </div>
      </div>
{/* //body */}
      <div className="px-5 py-2">{children}</div>
    </div>
  ));
}

export default ProtectedPage;