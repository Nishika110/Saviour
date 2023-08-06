import React from "react";
import {useSelector,useDispatch} from "react-redux";
import { GetAllBloodGroupsInventory } from "../../apicall/dashboard";
import {SetLoading} from "../../redux/loadersSlice";
import { message } from "antd";

import { useState,useEffect } from "react";
import { getLoggedInUserName } from "../../utils/helpers";
import InventoryTable from "../../components/InventoryTable";
function  Home() {
  const {currentUser}=useSelector((state)=>state.users);
  const [bloodGroupsData=[],setBloodGroupsData]=useState([]);
  const dispatch=useDispatch();
  const getData=async()=>{
    try{
      dispatch(SetLoading(true));
      const response=await GetAllBloodGroupsInventory();
      dispatch(SetLoading(false));
      if(response.success){
        setBloodGroupsData(response.data);
      }
      else{
        throw new Error(response.message);
      }
    }catch(error){
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  useEffect(()=>{getData();},[]);
  const colours=[
    "#FFF9C9",//whitish
    
    "#FFE17B",//red
    "#FFF6C3",//light yellow
    "#FFDB89",//darkyellow
    
    "#FBEEAC",//peach
    "#FBFFB1",//yellow
    
    
   

    "#FAE392", //red
    "#F2EE9D",//crimson
    

  ];

  return (

    <div >
     <span className="text-secondary text-2xl font-semibold">Welcome {getLoggedInUserName(currentUser)}</span>
      {currentUser.userType==="organization " && ( 
      <>
     <div className="grid grid-cols-4 gap-5 mb-5 mt-2 my-5">{bloodGroupsData.map((bloodGroup,index)=>{
      const color=colours[index];
      return (
        <div className="p-5 flex justify-between text-secondary rounded items-center" style={{backgroundColor:color}}>
          <h1 className="text-4xl uppercase">
            {bloodGroup.bloodGroup}
          </h1>
          <div className="flex flex-col justify-between gap-2">
          <div className="flex justify-between gap-3">
          <span>Total In </span>
          <span>{bloodGroup.totalIn} ml</span>
          </div>
          <div className="flex justify-between  gap-3">
          <span>Total Out </span>
          <span>{bloodGroup.totalOut} ml</span>
          </div>
          <div className="flex justify-between  gap-3">
          <span>Available</span>
          <span>{bloodGroup.available} ml</span>
          </div>

          </div>
        </div>

        
  );
     })}
     </div>
     <span className="text-secondary text-2xl mt-10 pt-5 font-semibold">Your Recent Inventory </span>
     <InventoryTable 
      filters={{organization:currentUser._id,}}
      //limit={5}
      userType={currentUser.userType}
     />
     </>)}
     {currentUser.userType==="donor" && ( 
      <>
      <div>
     <span className="text-secondary text-2xl  pt-5 font-semibold mt-5">Your Recent Donations </span>
     <InventoryTable 
      filters={{donor:currentUser._id,}}
      //limit={5}
      userType={currentUser.userType}
     />
     </div>
     </>)}
     {currentUser.userType==="hospital" && ( 
      <>
      <div>
     <span className="text-secondary text-2xl  pt-5 font-semibold mt-5">Your Recent Requests/Consumptions </span>
     <InventoryTable 
      filters={{hospital:currentUser._id,}}
      limit={5}
      userType={currentUser.userType}
     />
     </div>
     </>)}
     </div>
     );
}

export default Home;