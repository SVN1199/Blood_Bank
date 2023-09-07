import React, { useEffect, useState } from 'react'
import { getAllOrgainsationOfADonar, getAllOrganisationOfHospital } from '../../../apicalls/user'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/loadersSlice'
import { Modal, Table, message } from 'antd'
import { getDateFormat } from '../../../utils/helper'
import InventoryTable from '../../../components/InventoryTable'

function Organisations({userType}) {
const {currentUser} = useSelector((state)=>state.users)
const [showHistoryModal, setShowHistoryModal] = useState(false)
const [data,setData] = useState([])
const [selectedOrganisation, setSelectedOrganisation] = useState(null)
const dispatch = useDispatch()
const getData = async() =>{
try {
    dispatch(setLoading(true))
    let response = null
    if(userType==='hospital'){
        response = await getAllOrganisationOfHospital() ;
    }else{
        response = await getAllOrgainsationOfADonar()
    }
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
        dataIndex : "organisationName"
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
        title : ()=><div className='title'>{"ADDRESS"}</div>,
        dataIndex : "address"
    },
    {
        title : ()=><div className='title'>{"CREATED AT"}</div>,
        dataIndex : "createdAt",
        render : (text)=>getDateFormat(text)
    },
    {
        title : ()=><div className='title'>{"ACTION"}</div>,
        dataIndex : "actiom",
        render : (text, record)=>
            <span className="underline text-md cursor-pointer"
            onClick={()=>{
                setSelectedOrganisation(record)
                setShowHistoryModal(true)
            }
            }>
                HISTORY
            </span>
        }
    ,
]

  return (
    <div className='mt-5'>
        <Table columns={columns} dataSource={data}  className='tab' rowClassName={() => "rowClassName1"} />
        {showHistoryModal && (
        <Modal
        title ={
                `${
                    userType ==='donar'
                    ? "DONATIONS HISTORY"
                    : "CONSUMPTIONS HISTORY"
                } IN ${selectedOrganisation.organisationName}`  
            }       
            centered
            open={showHistoryModal}
            onClose={()=>setShowHistoryModal(false)}
            width={1000}
            onCancel={()=>setShowHistoryModal(false)}
            onOk={()=>setShowHistoryModal(false)}
            cancelButtonProps={{style : {background : "#000000", width:"80px"}}}
            okButtonProps={{style : {background : "red", width:"80px"}}}
        >
                <InventoryTable 
                    filters={{
                        organisation : selectedOrganisation._id,
                        [userType] : currentUser._id
                    }}
                   
                />
        </Modal>
        )}
    </div>
  )
}

export default Organisations