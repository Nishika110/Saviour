import {axiosInstance} from ".";

export const AddInventory = async(data)=>{
   return axiosInstance("post","/api/inventory/add",data);
};

export const GetInventory = ()=>{
   return axiosInstance("get","/api/inventory/get");
};


