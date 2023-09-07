import {axiosInstance} from '.'

export const addInventory = (data)=>{
    return axiosInstance('post','/api/inventory/add',data)
}

export const getInventory = () =>{
    return axiosInstance('get','/api/inventory/get')
}
export const getInventoyWithFilters = (filters, limit) =>{
    return axiosInstance("post","/api/inventory/filter",{filters, limit})
}