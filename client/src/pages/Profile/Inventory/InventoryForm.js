import { Form, Input, Modal, Radio, message } from 'antd'
import { useState } from 'react'
import { getAntdInputValidation } from '../../../utils/helper'
import {useDispatch, useSelector} from 'react-redux'
import { addInventory } from '../../../apicalls/inventory'
import { setLoading } from "../../../redux/loadersSlice"

function InventoryForm({open, setOpen, reloadData}) {
  const {currentUser} = useSelector((state) => state.users)
  const [form] = Form.useForm()
  const [inventoryType, setInventoryType] = useState('in')
  const dispatch = useDispatch()
  const onFinish = async(values)=>{
    try {
        dispatch(setLoading(true))
        const response = await addInventory({
            ...values,
            inventoryType,
            organisation : currentUser._id
        });
        dispatch(setLoading(false))
        if(response.success){
            reloadData()
            message.success("Add Inventory Success")
            setOpen(false)
        }else{
            throw new Error(response.message)
        }

    } catch (error) {
        message.error(error.message)
        dispatch(setLoading(false))
    }
  }
  return (
    <Modal
    title = "ADD INVENTORY"
    open = {open}
    onCancel = {()=>setOpen(false)}
    centered
    cancelButtonProps={{style : {background : "#000000", width:"80px"}}}
    okButtonProps={{style : {background : "red", width:"80px"}}}
    onOk={()=>{
        form.submit()
    }}
    
    >    
    <Form layout='vertical' 
    className='modal flex flex-col' form={form}
    onFinish={onFinish}
    >
        <Form.Item label="Inventory Type">
            <Radio.Group 
            value = {inventoryType}
            onChange = {(e)=> setInventoryType(e.target.value)}
            className='inout'
            >
                <Radio value="in" ><div className='inout'>IN</div></Radio>
                <Radio value="out"><div className='inout'>OUT</div></Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Blood Group" name="bloodGroup"
        rules={getAntdInputValidation()}
        >
            <select name="" id="">
                <option value="a+">A+</option>
                <option value="a-">A-</option>
                <option value="b+">B+</option>
                <option value="b-">B-</option>
                <option value="ab+">AB+</option>
                <option value="ab-">AB-</option>
                <option value="o+">O+</option>
                <option value="o-">O-</option>
            </select>
        </Form.Item>
        <Form.Item
            label={inventoryType ==="out"?"Hospital Email":"Donar Email"}
            name="email"
            rules={getAntdInputValidation()}
        >
            <Input type="email"/>
        </Form.Item>
        <Form.Item
            label="Quantity (ML)" name="quantity"
            rules={getAntdInputValidation()}
        >
            <Input type='number'/>
        </Form.Item>
    </Form>
    </Modal>
  )
}

export default InventoryForm