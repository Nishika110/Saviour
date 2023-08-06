import {axiosInstance} from ".";

export const AddInventory = async(data)=>{
   return axiosInstance("post","/api/inventory/add",data);
};

export const GetInventory = ()=>{
   return axiosInstance("get","/api/inventory/get");
};

// export const GetInventorywithFilters = (data)=>{
//    return axiosInstance("post","/api/inventory/filter",{filters: data});
// };

export const GetInventorywithFilters = (filters , limit) => {
   return axiosInstance("post", "/api/inventory/filter", {filters , limit});
 }
