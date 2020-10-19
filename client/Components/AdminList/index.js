import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";
import { Table, Tag, Space } from 'antd';
import { Button,Modal,Form,Input,InputNumber,Switch } from 'antd';

class AdminList extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Disabled',
        disabled: 'disabled',
        key: 'enabled',
        render: (text, record) => (
          <Space size="middle">
            { record.disabled ? "Yes":"No"}
          </Space>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    this.state = {
            data:[

           ],
           modalAdd :false
        };
         this.headers = {
            headers: { Authorization: 'Bearer '+this.token }
        };
    this.add = this.add.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleOkAdd = this.handleOkAdd.bind(this);
    this.modalAdd = this.modalAdd.bind(this);

    this.onFinishAdd = this.onFinishAdd.bind(this);

  }
  componentDidMount() {
      this.loadWish()
    }
    loadWish(){
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
  add(){
    this.setState({
      modalAdd:true
    });

  }

  handleOkAdd(e) {
    this.setState({
      modalAdd: false
    });
  };

  handleCancelAdd(e){
    this.setState({
      modalAdd: false
    });
  };
  modalAdd(){
    return   <Modal
      footer={null}
        title="Add a wish"
        visible={this.state.modalAdd}
        onOk={this.handleOkAdd}
        onCancel={this.handleCancelAdd}
      >
      {this.addForm()}
      </Modal>;
  }
  onFinishAdd(values) {
      var self = this;
       axios.post(process.env.API_DOMAIN+'/api/wish',{
         title:values.title,
         description:values.description,
         link:values.link,
         disabled:values.disabled,
         price:values.price
       },this.headers)
       .then(function (response) {
          self.loadWish();
          self.handleOkAdd();
       })
       .catch(function (error) {

                  console.log(error);
       })
       .then(function () {
       });
  };

  onFinishFailed(errorInfo){
    console.log('Failed:', errorInfo);
  };
  addForm(){
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
            onFinish={this.onFinishAdd}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="price"
            >
              <InputNumber step="0.01" placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="link"
            >
              <Input placeholder="Link" />
            </Form.Item>
            <Form.Item
              name="disabled"
              label="Disabled"
            >
              <Switch  />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Add wish
              </Button>
            </Form.Item>
          </Form>
    </div>);

  }

  render() {

    return <div>
      {this.modalAdd()}
       <Button onClick={this.add} type="primary">Add wish</Button>
     <Table columns={this.columns} dataSource={this.state.data} />
    </div>
    ;
  }
}

export default AdminList;
