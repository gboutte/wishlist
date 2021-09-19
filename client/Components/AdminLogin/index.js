import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import UserService from '../../Service/UserServices';

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

    UserService.login(values.username, values.password).then((response) => {
      if (typeof response.token !== 'undefined') {
        localStorage.setItem('token', response.token);
        self.callback();
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }
  loginForm() {

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
    </div>;
  }
}

export default AdminLogin;
