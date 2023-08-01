import {axiosInstance} from ".";

export const LoginUser = async(payload)=>{
    const response =await axiosInstance("post","/api/users/login",payload);
    return response;
};

export const RegisterUser = async(payload)=>{
    const response =await axiosInstance("post","/api/users/register",payload);
    return response;
};

export const GetCurrentUser = async()=>{
    const response =await axiosInstance("get","/api/users/get-current-user");
    return response;
};

export const GetAllDonors = ()=>{
    return axiosInstance("get","/api/users/get-all-donors");
 };

export const GetAllHospitals = ()=>{
    return axiosInstance("get","/api/users/get-all-hospitals");
 };

 export const GetAllOrganizations = ()=>{
    return axiosInstance("get","/api/users/get-all-organizations");
 };

 export const GetAllOrganizationsOfHospitals = ()=>{
    return axiosInstance("get","/api/users/get-all-organizations-hospitals");
 };
 