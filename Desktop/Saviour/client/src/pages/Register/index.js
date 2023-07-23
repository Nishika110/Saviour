import { Form, Input, Button, Radio } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import OrgHospital from "./OrgHospital";

function Register() {
  const [type, ssetType] = React.useState('donor')
   const onFinish=(values)=>{
    console.log(values);
   }
  return (
    <div className=' flex h-screen items-center justify-center bg-primary ' >
  
      <Form
        layout="vertical"
        className=" bg-secondary rounded shadow grid grid-cols-2 p-5 gap-5 w-half"
        onFinish={onFinish}
      > 

        <h1 className="col-span-2 text-2xl "> <span className=" text-primary">{type.toUpperCase()}-REGISTRATION</span><hr /></h1>
        <Radio.Group onChange={(e) => ssetType(e.target.value)} value={type} className="col-span-2">
          <Radio value="donor" className='text-white' >Donor</Radio>
          <Radio value="hospital" className='text-white'>Hospital</Radio>
          <Radio value="organization " className='text-white'>Organization</Radio>
        </Radio.Group>

        {type === "donor" && (<>{""}
          <Form.Item name="name" label={<label style={{ color: "white" }}>Name</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label={<label style={{ color: "white" }}> E-mail</label>}>
            <Input />
          </Form.Item>
          <Form.Item  name="Phone" label={<label style={{ color: "white" }}> Phone</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="Password" label={<label style={{ color: "white" }}> Password</label>}>
            <Input type="password"/>
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