import React from 'react'
import { message,Table } from "antd";
import {useDispatch} from "react-redux";
import { GetAllDonors } from '../../../apicall/users'; 
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from '../../../utils/helpers';

function Donors(){
    const [data,setData]=React.useState([]);
    const dispatch=useDispatch();
    const getData=async()=>{
    try {
        dispatch(SetLoading(true));
        const response = await GetAllDonors();
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
    const columns=[{
      title:"Name",
      dataIndex: "name" ,
    
    },
    {
    title:"Email",
    dataIndex: "email" ,
  
     },
     {
      title:"Phone",
      dataIndex: "phone" ,
      
       },
       {
       title:"Created At",
       dataIndex: "createdAt" ,
        render:(text)=>getDateFormat(text),
        },
        
    ] ;
    React.useEffect(()=>
      { getData();
       
      },[])
 
    return(
      <div>
      
      <Table columns={columns} dataSource={data} className="mt-3"/>
      
      </div>
    )
}

export default Donors;