import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Button, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { LoginUser } from '../../apicalls/user'
import {useDispatch} from 'react-redux'
import { setLoading } from '../../redux/loadersSlice'
import { getAntdInputValidation } from '../../utils/helper'

function Login() {
    const [type, setType] = useState('donar')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async(values) =>{
        try {
            dispatch(setLoading(true))
            const response = await LoginUser({
                ...values,
                userType : type
            });
            dispatch(setLoading(false))
            if (response.success) {
              message.success(response.message);
              localStorage.setItem('token',response.data)
              navigate('/')
            } else {
              throw new Error(response.message);
            }
          } catch (error) {
            dispatch(setLoading(false))
            message.error(error.message);
          }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate('/')
        }
    },[])

    return (
    <div className='Home'
    >   
        <div className='flex h-screen justify-center items-center  '>
        <Form 
        layout="vertical" 
        className='form bg-white rounded-2xl shadow grid grid-cols-1 p-4 gap-1 w-1/3'
        onFinish={onFinish}
        >
            <h1 className=' uppercase  text-xl'>
                <span className='span'>{type.toUpperCase()}</span>
                <span className='log'>  - Login</span>
                <hr className='line'/>
            </h1> 
            <Radio.Group onChange={(e)=>setType(e.target.value)} value={type}
                className='my-radio gap-4 mt-3'
            >
                <Radio value="donar" className='radio'>DONOR</Radio> 
                <Radio value="hospital" className='radio'>HOSPITAL</Radio> 
                <Radio value="organisation" className='radio'>ORGANIZATION</Radio> 
            </Radio.Group> 
                <div className='mt-3'>
                <Form.Item label="Email" name="email" className='label'
                rules={getAntdInputValidation()}
                >
                    <Input className='rounded-xl'/>
                </Form.Item>
                <Form.Item label="Password" name="password" className='label'
                rules={getAntdInputValidation()}
                >
                    <Input type='password' />
                </Form.Item>
            
                <Button className='button rounded-full text-white-500 ' block 
                htmlType='submit' 
                >
                    LOGIN
                </Button>
                </div>
                <Link to="/register"className="link">
                 Don't Have an Account ? Register
                </Link>
        </Form>
        
    </div>
    </div>
   
  )
}

export default Login