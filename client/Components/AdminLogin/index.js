import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import './style.css';
import { Redirect } from "react-router-dom";
import AdminList from '../AdminList';
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class AdminLogin extends React.Component {

  constructor(props) {
    super(props);
    this.callback = props.callback;


    this.onFinish = this.onFinish.bind(this);
    this.state = {
      token: null,
      connected: false
    };

  }
  onFinish(values) {
    var self = this;
    axios.post(process.env.API_DOMAIN + '/api/user/login', {
      username: values.username,
      password: values.password
    })
      .then(function (response) {

        if (typeof response.data.data.token != "undefined") {

          localStorage.setItem('token', response.data.data.token);
          self.callback();
        }

      })
      .catch(function (error) {

        console.log(error);
      })
      .then(function () {
      });
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };
  loginForm() {
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

    return (<div className="my-container">
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
            { required: true, message: 'Please input your Password!' }
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
            Login
              </Button>
        </Form.Item>
      </Form>
    </div>);

  }
  render() {

    return <div>
      {this.loginForm()}
    </div>
      ;
  }
}

export default AdminLogin;
