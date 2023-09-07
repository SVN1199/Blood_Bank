import React, { useEffect, useState } from 'react'
import { getInventoyWithFilters } from '../apicalls/inventory'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/loadersSlice'
import { getDateFormat } from '../utils/helper'
import { Table, message } from 'antd'

function InventoryTable({filters, userType, limit}) {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const columns = [
        {
          title : () =><div className='title'>{"INVENTORY TYPE"}</div>,
          dataIndex : "inventoryType",
          render : (text)=>text.toUpperCase()
        },
        {
          title : () =><div className='title'>{"BLOOD GROUP"}</div>,
          dataIndex : "bloodGroup",
          render : (text)=>text.toUpperCase()
        },
        {
          title : () =><div className='title'>{"QUANTITY"}</div>,
          dataIndex : "quantity",
          render : (text)=>text + " ML"
        },
        {
          title : () =><div className='title'>{"REFERENCE"}</div>,
          dataIndex : "reference",
          render : (text,record)=>{
            if(userType === 'organisation'){
              return record.inventoryType === 'in'
              ? record.donar?.name
              : record.hospital?.hospitalName
            }
            else{
              return record.organisation.organisationName
            }
          }
        },
        {
          title : () =><div className='title'>{"DATE"}</div>,
          dataIndex : "createdAt",
          render : (text) => getDateFormat(text)
        }
      ]

      // change column for hospital or donar
      if(userType !== 'organisation'){
        // remove inventory type column
        columns.splice(0,1)

        // change reference column to organistaion Name
        columns[2].title = () =><div className='title'>{'ORGANIZATION NAME'}</div>

        // date column should be renamed taken date
        columns[3].title = userType === "hospital" ? ()=> <div className='title'>{"TAKEN DATE"}</div> : <div className='title'>{"DONATE DATE"}</div>
      }
    
      const getData = async() =>{
        try {
          dispatch(setLoading(true))
          const response = await getInventoyWithFilters(filters, limit);
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
    <div className='mt-5'>
        <Table
         columns={columns}
         dataSource={data} 
         rowClassName={() => "rowClassName1"} 
        />
    </div>
  )
}

export default InventoryTable