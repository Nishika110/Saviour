import React from "react";
import { Form, Input, }from "antd";

const { TextArea } = Input;

function OrgHospital({type} ) {
  return (
    < >
    <Form.Item  label={ <label style={{ color: "white" }}> {type=== "hospital"? 'Hospital Name': 'Organization Name'}</label>}
                name={type==="hospital"?'Hospital Name': 'Organization Name'}>
            <Input />
          </Form.Item>
          <Form.Item name="owner" label={<label style={{ color: "white" }}> Owner</label>}>
            <Input />
          </Form.Item>
          <Form.Item  name="email"label={<label style={{ color: "white" }}> E-mail</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="phone"label={<label style={{ color: "white" }}> Phone</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label={<label style={{ color: "white" }}> Website</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label={<label style={{ color: "white" }}> Password</label>}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label={<label style={{ color: "white" }}>Address</label>} className="col-span-2">
            <TextArea rows={3} />
          </Form.Item>
          </>
   
   
  );
}

export default OrgHospital;