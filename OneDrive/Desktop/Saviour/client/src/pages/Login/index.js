import { Form, Input, Button, Radio } from "antd";
import React from "react";
import { Link } from "react-router-dom";


function Login() {
  const [type, ssetType] = React.useState('donor')
  const onFinish = (values) => {
    console.log(values);
  }
  return (
    <div className=' flex h-screen items-center justify-center bg-primary ' >

      <Form
        layout="vertical"
        className=" bg-secondary rounded shadow grid grid-cols-1 p-5 gap-5 w-half"
        onFinish={onFinish}
      >

        <h1 className=" text-2xl "> <span className=" text-primary">{type.toUpperCase()}-LOGIN</span><hr /></h1>
        <Radio.Group onChange={(e) => ssetType(e.target.value)} value={type} >
          <Radio value="donor" className='text-white' >Donor</Radio>
          <Radio value="hospital" className='text-white'>Hospital</Radio>
          <Radio value="organization " className='text-white'>Organization</Radio>
        </Radio.Group>


       
        <Form.Item className="margin-bottom=0" name="email" label={<label style={{ color: "white" }}> E-mail</label>}>
          <Input />
        </Form.Item>
        
        <Form.Item className="margin-top=0"name="Password" label={<label style={{ color: "white" }}> Password</label>}>
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