import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import UserService from '../../Service/UserServices';

class Installation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.onFinish = this.onFinish.bind(this);
  }
  onFinish(values) {
    var self = this;

    UserService.install(values.username, values.password)
      .then(() => {
        self.setState({
          redirect: true
        });

      });
  }

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  render() {
    var style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    };


    return <div style={style}>
      <div>
        {this.state.redirect ? <Redirect to="/admin" /> : null}
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
    </div>;
  }
}

export default Installation;
