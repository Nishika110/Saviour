import React from "react";
import { Form, Input, }from "antd";
import { getAntdInputValidation } from "../../utils/helpers";
const { TextArea } = Input;

function OrgHospital({type} ) {
  return (
    < >
     
    <Form.Item  rules={getAntdInputValidation()} label={ <label style={{ color: "white" }}> {type=== "hospital"? 'Hospital Name': 'Organization Name'}</label>}
                name={type==="hospital"?'hospitalName': 'organizationName'}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()} name="owner" label={<label style={{ color: "white" }}> Owner</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()}  name="email"label={<label style={{ color: "white" }}> E-mail</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()} name="phone"label={<label style={{ color: "white" }}> Phone</label>}>
            <Input />
          </Form.Item>
          <Form.Item  rules={getAntdInputValidation()}name="website" label={<label style={{ color: "white" }}> Website</label>}>
            <Input />
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()} name="password" label={<label style={{ color: "white" }}> Password</label>}>
            <Input type="password"/>
          </Form.Item>
          <Form.Item rules={getAntdInputValidation()}  name="address" label={<label style={{ color: "white" }}>Address</label>} className="col-span-2">
            <TextArea rows={3} />
          </Form.Item>
          </>
   
   
  );
}

export default OrgHospital;