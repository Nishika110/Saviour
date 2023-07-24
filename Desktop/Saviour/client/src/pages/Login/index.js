import { Form, Input, Button, Radio ,message} from "antd";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import {  LoginUser } from "../../apicall/users";

function Login() {
  const [type, setType] = React.useState('donor')
  const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message)
        localStorage.setItem("token",response.data);
        navigate("/")
      }
      else{
      
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className=' flex h-screen items-center justify-center bg-primary ' >

      <Form
        layout="vertical"
        className=" bg-secondary rounded shadow grid grid-cols-1 p-5 gap-5 w-half"
        onFinish={onFinish}
      >

        <h1 className=" text-2xl "> <span className=" text-primary">{type.toUpperCase()}-LOGIN</span><hr /></h1>
        <Radio.Group onChange={(e) => setType(e.target.value)} value={type} >
          <Radio value="donor" className='text-white' >Donor</Radio>
          <Radio value="hospital" className='text-white'>Hospital</Radio>
          <Radio value="organization " className='text-white'>Organization</Radio>
        </Radio.Group>


       
        <Form.Item className="margin-bottom=0" name="email" label={<label style={{ color: "white" }}>E-mail</label>}>
          <Input />
        </Form.Item>
        
        <Form.Item className="margin-top=0"name="password" label={<label style={{ color: "white" }}>Password</label>}>
          <Input type="password" />
        </Form.Item>




        <Button type="primary" block className="color-primary text-reddish" htmlType="submit">Login</Button>

        <Link to="/register" className=" text-center text-primary " >
          Dont have an account? Register
        </Link>

      </Form>
    </div>
  );
}

export default Login;