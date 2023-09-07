import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loadersSlice';
import {GetAllHospitalOfAnOrganisation } from '../../../apicalls/user';
import { Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helper';

function Hospitals() {
const [data,setData] = useState([])
const dispatch = useDispatch()
const getData = async() =>{
try {
    dispatch(setLoading(true))
    const response = await GetAllHospitalOfAnOrganisation();
    dispatch(setLoading(false))
    if(response.success){
    setData(response.data)
    }
    else{
    throw new Error(response.message)
    }
} catch (error) {
    message.error(error.message)
    dispatch(setLoading(false))
}
}
useEffect(()=>{
getData()
},[])

const columns = [
    {
        title : <div className='title'>{"HOSPITAL NAME"}</div>,
        dataIndex : "hospitalName"
    },
    {
        title : <div className='title'>{"EMAIL"}</div>,
        dataIndex : "email"
    },
    {
        title :<div className='title'>{"PHONE"}</div>,
        dataIndex : "phone"
    },
    {
        title :<div className='title'>{"ADDRESS"}</div>,
        dataIndex : "address"
    },
    {
        title : <div className='title'>{"CREATED AT"}</div>,
        dataIndex : "createdAt",
        render : (text)=>getDateFormat(text)
    },
]

  return (
    <div >
        <Table columns={columns} dataSource={data} rowClassName={() => "rowClassName1"}/>
    </div>
  )
}

export default Hospitals