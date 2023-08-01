import React from 'react'
import { message,Modal,Table } from "antd";
import {useDispatch, useSelector} from "react-redux";
import { GetAllOrganizations, GetAllOrganizationsOfHospitals} from '../../../apicall/users'; 
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from '../../../utils/helpers';
import InventoryTable from '../../../components/InventoryTable';

function Organizations({userType}){
  const [showHistoryModal,setShowHistoryModal]=React.useState(false);
  const {currentUser}=useSelector((state)=>state.users);
  const [selectedOrganization,setSelectedOrganization]=React.useState(null);
    const [data,setData]=React.useState([]);
    const dispatch=useDispatch();
    const getData=async()=>{
    try {
        dispatch(SetLoading(true));
        let response=null;
        if(userType==="hospital"){
            response=await GetAllOrganizationsOfHospitals();
        }
        else{ response=await GetAllOrganizations();}
       
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
      dataIndex: "organizationName" ,
    //  render:(text)=>text.toUpperCase()
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
       dataIndex: "cretaedAt" ,
        render:(text)=>getDateFormat(text)
        },
        {
          title:"Action",
          dataIndex: "action" ,
          render:(text,record)=>(
            <span className="underline text-md cursor-pointer"
            onClick={()=>{setSelectedOrganization(record);setShowHistoryModal(true);}}>
              History
            </span>
          )
           },
        
    ] ;
    React.useEffect(()=>
      { getData();
       
      },[]);
 
    return (
      <div>
      <Table columns={columns} dataSource={data} />
      {showHistoryModal &&(<Modal title={`${userType==="donor"?"Donation History":"Consumption History"} In ${selectedOrganization.organizationName}`}centered open={showHistoryModal} onClose={()=>setShowHistoryModal(false)} width={1000}
      onCancel={()=>setShowHistoryModal(false)}>
      <InventoryTable filters={{organization:selectedOrganization._id,[userType]:currentUser._id,}}/>
      </Modal>)}
      </div>
    );
}


export default Organizations