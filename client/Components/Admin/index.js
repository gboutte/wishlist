import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";
import AdminList from '../AdminList';
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Admin extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
            token:null,
            connected:false
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
  loginForm(){
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
    return <div>
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

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Install
              </Button>
            </Form.Item>
          </Form>
    </div>;

  }
  render() {
    var page;
    if(this.state.connected){
      page = <AdminList/>;
    }else{
      page = this.loginForm();
    }
    return <div>
      <h1>Admin</h1>

    </div>
    ;
  }
}

export default Admin;
