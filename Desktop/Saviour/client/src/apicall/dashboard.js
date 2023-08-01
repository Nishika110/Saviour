import axios from 'axios';
import { axiosInstance } from '.';

export const GetAllBloodGroupsInventory=()=>{
  return axiosInstance("get","/api/dashboard/blood-groups-data");
  };

