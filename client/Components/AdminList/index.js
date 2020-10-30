import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";
import { Table, Tag, Space } from 'antd';
import { Button,Modal,Form,Input,InputNumber,Switch } from 'antd';

class AdminList extends React.Component {

  constructor(props) {
    super(props);
    var self = this;
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
            <a onClick={()=>{self.edit(record.id)}}>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    this.state = {
            data:[

           ],
           modalAdd :false,
           modalEdit :false,
           editId:null,
           editRecord:null
        };
         this.headers = {
            headers: { Authorization: 'Bearer '+this.token }
        };
    this.add = this.add.bind(this);
    this.modalAdd = this.modalAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.edit = this.edit.bind(this);
    this.modalEdit = this.modalEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.editForm = this.editForm.bind(this);
    this.onFinishAdd = this.onFinishAdd.bind(this);
    this.onFinishEdit = this.onFinishEdit.bind(this);

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
        data:response.data.data.map((record)=>{
          record['key'] = record.id;
          return record;
        })
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
  edit(id){
    var self = this;
    axios.get(process.env.API_DOMAIN+'/api/wish/'+id,this.headers)
    .then(function (response) {
      self.setState({
        modalEdit:true,
        editId:id,
        editRecord:response.data.data
      });
    })
    .catch(function (error) {

               console.log(error);
    })
    .then(function () {
    });

  }
  closeAdd(){
    this.setState({
      modalAdd: false
    });
  }
  closeEdit(){
    this.setState({
      modalEdit: false,
      editId:null,
      editRecord:null
    });
  }

  modalEdit(){

    return   <Modal
      footer={null}
        title="Add a wish"
        visible={this.state.modalEdit}
        onOk={this.closeEdit}
        onCancel={this.closeEdit}
      >
      {this.editForm()}
      </Modal>;
  }
  modalAdd(){
    return   <Modal
      footer={null}
        title="Add a wish"
        visible={this.state.modalAdd}
        onOk={this.closeAdd}
        onCancel={this.closeAdd}
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
          self.closeAdd();
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
  onFinishEdit(values){
    var self = this;
     axios.put(process.env.API_DOMAIN+'/api/wish',{
       id:self.state.editId,
       title:values.title,
       description:values.description,
       link:values.link,
       disabled:values.disabled,
       price:values.price
     },this.headers)
     .then(function (response) {
        self.loadWish();
        self.closeEdit();
     })
     .catch(function (error) {

                console.log(error);
     })
     .then(function () {
     });
  }
  editForm(){

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
var form = null;
if(this.state.editRecord != null){

    form =  (<div className="my-container">
      <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinishEdit}
          >
            <Form.Item
              initialValue={this.state.editRecord.title}
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input  placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              initialValue={this.state.editRecord.description}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="price"
              initialValue={this.state.editRecord.price}
            >
              <InputNumber step="0.01" placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="link"
              initialValue={this.state.editRecord.link}
            >
              <Input placeholder="Link" />
            </Form.Item>
            <Form.Item
              name="disabled"
              label="Disabled"
            >
              <Switch defaultChecked={this.state.editRecord.disabled}  />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Save wish
              </Button>
            </Form.Item>
          </Form>
    </div>);
}
return form;
  }

  render() {

    return <div>
      {this.modalAdd()}
      {this.modalEdit()}
       <Button onClick={this.add} type="primary">Add wish</Button>
     <Table columns={this.columns} dataSource={this.state.data} />
    </div>
    ;
  }
}

export default AdminList;
