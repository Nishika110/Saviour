import React from "react"
import { useDispatch } from "react-redux";
import { GetInventorywithFilters } from "../apicall/inventory";
import {message,Table} from "antd";
import { SetLoading } from "../redux/loadersSlice";
import { getDateFormat } from "../utils/helpers";

function InventoryTable({filters,userType,limit}){
    const [data,setData]=React.useState([]);
   
    const dispatch=useDispatch();
    const columns=[{
     title:"Inventory Type",
     dataIndex: "inventoryType" ,
     render:(text)=>text.toUpperCase()
   },
   {
   title:"Blood Group",
   dataIndex: "bloodGroup" ,
   render:(text)=>text.toUpperCase()
    },
    {
     title:"Quantity",
     dataIndex: "quantity" ,
     render:(text)=>text+"ml"
      },
      {
      title:"Reference",
      dataIndex: "reference" ,
      render :(text, record)=>{
      if(userType=== "organization "){
         return record.inventoryType==="in"?record.donor?.name: record.hospital?.hospitalName;
      }
      if(userType=== "donor"){
        return record.organization.organizationName;
     }
     if(userType=== "hospital"){
      return record.organization.organizationName;
   }
    },},
       {
         title:"Date",
         dataIndex: "createdAt" ,
         render:(text)=>getDateFormat(text)
          },
 
   ] ;
   //change coloumns for hospital
   if(userType!=="organization "){
    columns.splice(0,1);  
  columns[2].title="Organization Name" ;
  columns[3].title=userType==="hospital"?"Taken Date":"Donated Date" ;
}

// if(userType==="hospital"){
// columns.splice(0,1);  
// columns[2].title="Organization Name" 
// columns[3].title="Consumed On" 
// }
   const getData=async()=>{
     try {
         dispatch(SetLoading(true));
         const response =  await GetInventorywithFilters(filters,limit);
         dispatch(SetLoading(false));
         if (response.success) {
         setData(response.data);
         }
         else{
        
           throw new Error(response.message);
         }
       } catch (error) {
        
         message.error(error.message);
         dispatch(SetLoading(false));
       }
     };
     React.useEffect(()=>
       { getData();
        
       },[]);
      
    return(
        <div>
        <Table columns={columns} dataSource={data} className="mt-3"/>
        </div>
    );
}

export default InventoryTable;