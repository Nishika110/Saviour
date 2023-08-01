import React from "react"
import InventoryForm from "./inventoryform";
import {Button,Table, message } from "antd";
import {useDispatch} from "react-redux";
import { getDateFormat } from "../../../utils/helpers";
import { GetInventory} from "../../../apicall/inventory";
import { SetLoading } from "../../../redux/loadersSlice";

function Inventory() {
    const [data,setData]=React.useState([]);
   const[open,setOpen]=React.useState(false);
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
    //  render : (text,record)=>{
    //   if(record.InventoryType==="in"){
    //     return record.donor.name
    //   }
    //   else{ 
    //     return  record.hospital.name
    //   }
    //  },
      },
      {
        title:"Date",
        dataIndex: "date" ,
        render:(text)=>getDateFormat(text)
         },

  ] 
  const getData=async()=>{
    try {
        dispatch(SetLoading(true));
        const response = await GetInventory();
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
    }
    React.useEffect(()=>
      { getData();
       
      },[]);

  
   return (
        <div>
        <div className="flex justify-end">
            <Button type="primary" onClick={() => setOpen(true)}>Add Inventory</Button>
        </div>
        <Table columns={columns} dataSource={data} className="mt-3"/>
        {open && <InventoryForm open={open} setOpen={setOpen} reloadData={getData}/>}
        </div>
    );
}

export default Inventory;