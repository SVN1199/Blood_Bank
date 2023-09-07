import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import InventoryForm from './InventoryForm'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../redux/loadersSlice'
import { getInventory } from '../../../apicalls/inventory'
import { getDateFormat } from '../../../utils/helper'

function Inventory() {
  const[data, setData] = useState([])
  const[open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const columns = [
    {
      title : ()=><div className='title'>{"INVENTORY TYPE"}</div>,
      dataIndex : "inventoryType",
      render : (text)=>text.toUpperCase()
    },
    {
      title : ()=><div className='title'>{"BLOOD GROUP"}</div>,
      dataIndex : "bloodGroup",
      render : (text)=>text.toUpperCase()
    },
    {
      title :()=><div className='title'>{"QUANTITY"}</div>,
      dataIndex : "quantity",
      render : (text)=>text + " ML"
    },
    {
      title : ()=><div className='title'>{"REFERENCE"}</div>,
      dataIndex : "reference",
      render : (text,record)=>{
        if(record.inventoryType === 'in'){
          return record.donar.name
        }else{
          return record.hospital.hospitalName
        }
      }
    },
    {
      title : ()=><div className='title'>{"DATE"}</div>,
      dataIndex : "createdAt",
      render : (text) => getDateFormat(text)
    }
  ]

  const getData = async() =>{
    try {
      dispatch(setLoading(true))
      const response = await getInventory();
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
  return (
    <div >
        <div className=" flex justify-end">
            <Button type="default" className='addInv' onClick={()=>setOpen(true)}>
                AddInventory
            </Button>
        </div>
        <Table columns={columns} dataSource={data} rowClassName={() => "rowClassName1"}
        className='mt-5'
        />
        {open && <InventoryForm open={open} setOpen={setOpen}
        reloadData={getData}
        />}
    </div>
  )
}

export default Inventory