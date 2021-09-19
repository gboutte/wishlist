import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import AdminList from '../../Components/AdminList';
import AdminLogin from '../../Components/AdminLogin';

class Admin extends React.Component {

  constructor(props) {
    super(props);


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

  render() {
    var page;
    if (this.state.connected) {
      page = <AdminList />;
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
