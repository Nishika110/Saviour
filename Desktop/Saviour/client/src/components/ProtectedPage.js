import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicall/users";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import {SetLoading} from "../redux/loadersSlice"
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
    <div >
      {currentUser && <h1>Welcome {getLoggedInUserName(currentUser)}</h1>}
      {children}
    </div>
  );
}

export default ProtectedPage;