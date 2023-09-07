import { axiosInstance } from ".";


export const getAllBloodGroupInventory = () =>{
    return axiosInstance("get","/api/dashboard/blood-groups-data")
}