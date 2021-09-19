import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import AdminList from '../../Components/AdminList';
import AdminLogin from '../../Components/AdminLogin';
import { Button } from 'antd';

class Admin extends React.Component {

  constructor(props) {
    super(props);


    this.logout = this.logout.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.state = {
      connected: false
    };

  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        connected: true
      });
    }

  }
  onConnect() {
    this.setState({
      connected: true
    });
  }
  logout() {
    localStorage.setItem('token', null);
    localStorage.removeItem('token');
    this.setState({
      connected: false
    });
  }

  render() {
    var page;
    if (this.state.connected) {
      page = <div>
        <Button type="primary" className="logoutButton" onClick={this.logout}>Logout</Button>
        <AdminList />
      </div>;
    } else {
      page = <AdminLogin callback={this.onConnect} />;
    }
    return <div>
      <h1>Admin</h1>
      {page}
    </div>;
  }
}

export default Admin;
