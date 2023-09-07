import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Button, message } from "antd";
import { OrgHospitalForm } from "./OrgHospitalForm";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/user";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helper";
function Register() {
  const [type, setType] = useState("donar");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate('/login')
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Home">
      <div className="flex h-screen justify-center items-center">
      <Form
        layout="vertical"
        className="form bg-white rounded-2xl shadow grid grid-cols-2 p-4 gap-3 w-1/3"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase text-xl">
          <span className="text-primary">
            {type.toUpperCase()} - Registration
          </span>
          <hr />
        </h1>
        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donar" className="radio">DONOR</Radio>
          <Radio value="hospital" className="radio">HOSPITAL</Radio>
          <Radio value="organisation" className="radio">ORGANIZATION</Radio>
        </Radio.Group>
        {type === "donar" && (
          <>
            {""}
            <Form.Item label="Name" name="name" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAntdInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={getAntdInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={getAntdInputValidation()}
            >
              <Input type="password" />
            </Form.Item>
          </>
        )}
        {type !== "donar" && <OrgHospitalForm type={type} />}

        <Button className='button col-span-2 rounded-full text-white-500 ' block 
                htmlType='submit' 
                >
                    REGISTRATION
                </Button>
        <Link
          to="/login"
          className="link col-span-2 "
        >
          Already Have an Account ? Login
        </Link>
      </Form>
    </div>
    </div>
    
  );
}

export default Register;
