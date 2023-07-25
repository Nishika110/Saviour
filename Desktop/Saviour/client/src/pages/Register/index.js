import { Form, Input, Button, Radio, message } from "antd";
import React,  {useEffect} from "react";
import { Link, useNavigate  } from "react-router-dom";
import OrgHospital from "./OrgHospital";
import { RegisterUser } from "../../apicall/users";
import {useDispatch} from "react-redux";
import {SetLoading} from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";
function Register() {
  const dispatch=useDispatch();
  const [type, setType] = React.useState("donor")
  const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser({ ...values, userType: type, });
      if (response.success) {
        message.success(response.message);
        dispatch(SetLoading(false));
        navigate("/login");
      }
      else{
    
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/");
    }
  },[])
  return (
    <div className=' flex h-screen items-center justify-center bg-primary ' >

      <Form
        layout="vertical"
        className=" bg-secondary rounded shadow grid grid-cols-2 p-5 gap-5 w-half"
        onFinish={onFinish}
      >

        <h1 className="col-span-2 text-2xl "> <span className=" text-primary">{type.toUpperCase()}-REGISTRATION</span><hr /></h1>
        <Radio.Group onChange={(e) => setType(e.target.value)} value={type} className="col-span-2">
          <Radio value="donor" className='text-white' >Donor</Radio>
          <Radio value="hospital" className='text-white'>Hospital</Radio>
          <Radio value="organization " className='text-white'>Organization</Radio>
        </Radio.Group>

        {type === "donor" && (<>{""}
          <Form.Item rules={getAntdInputValidation()}name="name" label={<label style={{ color: "white" }}>Name</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()}name="email" label={<label style={{ color: "white" }}> E-mail</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()}name="phone" label={<label style={{ color: "white" }}> Phone</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()} name="password" label={<label style={{ color: "white" }}> Password</label>}>
            <Input type="password" />
          </Form.Item>
        </>)}

        {type !== "donor" && <OrgHospital type={type} />}

        <Button type="primary" block className="col-span-2 color-primary text-reddish" htmlType="submit">Register</Button>

        <Link to="/login" className="col-span-2 text-center text-primary " >
          Already have an account? Login
        </Link>

      </Form>
    </div>
  );
}

export default Register;