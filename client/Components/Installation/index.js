import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from "react-router-dom";

class Installation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          redirect:false
        };

  }
    onFinish(values) {
      var self = this;
         axios.post(process.env.API_DOMAIN+'/api/install/user',{
           username:values.username,
           password:values.password
         })
         .then(function (response) {
            self.setState({
              redirect:true
            })

         })
         .catch(function (error) {

         })
         .then(function () {
         });
    };

    onFinishFailed(errorInfo){
      console.log('Failed:', errorInfo);
    };
  render() {
    var style= {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100%"
    }
    const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
var redirect ;
if(this.state.redirect){
  redirect = <Redirect to="/admin" />
}
    return <div style={style}>
      <div>
        {redirect}
        <h1>Installation</h1>
          <Form
                name="normal_login"
                className="login-form"
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your Password!' },
                  { min: 8, message: 'Password must be atleast 8 chars !' },
                ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  name="passwordAgain"
                  rules={
                    [
                      { required: true, message: 'Please input your Password!' },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('The two passwords that you entered do not match!');
                        },
                      })
                  ]
                }
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password again"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Install
                  </Button>
                </Form.Item>
              </Form>
      </div>

    </div>
    ;
  }
}

export default Installation;
