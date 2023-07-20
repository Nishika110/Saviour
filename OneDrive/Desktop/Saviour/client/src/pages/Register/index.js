import { Form, Input, Button } from "antd";
import React from "react";
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className=' flex h-screen items-center justify-center bg-primary ' >

      <Form layout="vertical" className=" bg-secondary rounded shadow grid grid-cols-2 p-5 gap-5 w-half">
        <h1 className="col-span-2 text-2xl "> <span className=" text-primary">Register</span><hr /></h1>

        <Form.Item  label={<label style={{ color: "white" }}>Name</label>}>
          <Input />
        </Form.Item>
        <Form.Item  label={<label style={{ color: "white" }}> E-mail</label>}>
          <Input />
        </Form.Item>
        <Form.Item label={<label style={{ color: "white" }}> Phone</label>}>
          <Input />
        </Form.Item>
        <Form.Item  label={<label style={{ color: "white" }}> Password</label>}>
          <Input />
        </Form.Item>
        <Button type="primary" block className="col-span-2 color-primary text-reddish">Register</Button>
       
         <Link to="/login" className="col-span-2 text-center text-primary " >
          Already have an account? Login
         </Link>
      </Form>
    </div>
  );
}

export default Register;