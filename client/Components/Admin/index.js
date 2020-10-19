import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import './style.css';
import {Redirect} from "react-router-dom";
import AdminList from '../AdminList';
import AdminLogin from '../AdminLogin';
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Admin extends React.Component {

  constructor(props) {
    super(props);


        this.onConnect = this.onConnect.bind(this);
    this.state = {
            token:null,
            connected:false
        };

  }
  onConnect(token){
    this.setState({
      token:token,
      connected:true
    })
  }

  render() {
    var page;
    if(this.state.connected){
      page = <AdminList token={this.state.token}/>;
    }else{
      page = <AdminLogin callback={this.onConnect} />;
    }
    return <div>
      <h1>Admin</h1>
      {page}
    </div>
    ;
  }
}

export default Admin;
