import {axiosInstance} from ".";

export const AddInventory = async(data)=>{
    const response =await axiosInstance("post","/api/inventory/add",data);
    return response;
};

// export const RegisterUser = async(payload)=>{
//     const response =await axiosInstance("post","/api/users/register",payload);
//     return response;
// };

// export const GetCurrentUser = async()=>{
//     const response =await axiosInstance("get","/api/users/get-current-user");
//     return response;
// };
