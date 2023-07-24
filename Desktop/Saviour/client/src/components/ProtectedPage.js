import React,{useEffect,useState} from "react";
import {message} from "antd";
import {GetCurrentUser} from "../apicall/users";
import { useNavigate } from "react-router-dom";
function  ProtectedPage({children}) {
  const navigate=useNavigate();
  const [currentUser,setCurrentUser]=useState(null);
  const getCurrentUser=async()=>{
    try{
     const response= await GetCurrentUser();
     if(response.success){
        message.success(response.message);
        setCurrentUser(response.data);
     }
     else{
        throw new Error(response.message);
     }
    }catch(error){
        message.error(error.message);
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
    getCurrentUser(); 
  }else{
    navigate("/login");
  }},[]);
  return (
    <div >
    {currentUser && <h1>Welcome {currentUser?.name}</h1>}
 { children}
    </div>
  );
}

export default ProtectedPage;