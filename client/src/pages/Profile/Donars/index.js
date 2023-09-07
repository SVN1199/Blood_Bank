import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loadersSlice';
import { GetAllDonarsOfAnOrganisation } from '../../../apicalls/user';
import { Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helper';

function Donars() {
const [data,setData] = useState([])
const dispatch = useDispatch()
const getData = async() =>{
try {
    dispatch(setLoading(true))
    const response = await GetAllDonarsOfAnOrganisation();
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
        title : ()=><div className='title'>{"NAME"}</div>,
        dataIndex : "name",
    },
    {
        title : ()=><div className='title'>{"EMAIL"}</div>,
        dataIndex : "email"
    },
    {
        title : ()=><div className='title'>{"PHONE"}</div>,
        dataIndex : "phone"
    },
    {
        title : ()=><div className='title'>{"CREATED AT"}</div>,
        dataIndex : "createdAt",
        render : (text)=>getDateFormat(text)
    },
]

  return (
    <div >
        <Table columns={columns} dataSource={data} className='organisation' rowClassName={() => "rowClassName1"}/>
    </div>
  )
}

export default Donars