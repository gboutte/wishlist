import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";
import { Table, Tag, Space } from 'antd';

class AdminList extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Enabled',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          <Space size="middle">
            { record.enabled ? "Yes":"No"}
          </Space>
        ),
      },
      {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
      },
      {
        title: 'Keep',
        dataIndex: 'to_keep',
        key: 'to_keep',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    this.state = {
            data:[

           ]
        };

  }
  componentDidMount() {
      var self = this;
      axios.get(process.env.API_DOMAIN+'/api/wish')
      .then(function (response) {
        // handle success
        self.setState({
          data:response.data.data
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

  render() {

    return <div>
      list
    </div>
    ;
  }
}

export default AdminList;
