import React from 'react';
import 'antd/dist/antd.css';
import { Table, Space } from 'antd';
import { Button, Modal, Form, Input, InputNumber, Switch } from 'antd';
import WishService from '../../Service/WishServices';

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
            {record.disabled ? 'Yes' : 'No'}
          </Space>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => { self.edit(record.id); }}>Edit</a>
            <a onClick={() => { self.delete(record.id); }}>Delete</a>
          </Space>
        ),
      },
    ];

    this.state = {
      data: [

      ],
      modalAdd: false,
      modalEdit: false,
      editId: null,
      editRecord: null,
      deleteId: null
    };

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.modalAdd = this.modalAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.edit = this.edit.bind(this);
    this.modalEdit = this.modalEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.editForm = this.editForm.bind(this);
    this.onFinishAdd = this.onFinishAdd.bind(this);
    this.onFinishEdit = this.onFinishEdit.bind(this);
    this.onFinishDelete = this.onFinishDelete.bind(this);

  }
  componentDidMount() {
    this.loadWish();
  }
  loadWish() {
    var self = this;

    WishService.getAll()
      .then((wishes) => {
        // handle success
        self.setState({
          data: wishes.map((record) => {
            record['key'] = record.id;
            return record;
          })
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  add() {
    this.setState({
      modalAdd: true
    });

  }
  edit(id) {
    var self = this;
    WishService.get(id)
      .then((wish) => {
        self.setState({
          modalEdit: true,
          editId: id,
          editRecord: wish
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }
  delete(id) {
    this.setState({
      deleteId: id
    });
  }
  closeAdd() {
    this.setState({
      modalAdd: false
    });
  }
  closeDelete() {
    this.setState({
      deleteId: null
    });
  }
  closeEdit() {
    this.setState({
      modalEdit: false,
      editId: null,
      editRecord: null
    });
  }

  modalEdit() {

    return <Modal
      footer={null}
      title="Add a wish"
      visible={this.state.modalEdit}
      onOk={this.closeEdit}
      onCancel={this.closeEdit}
    >
      {this.editForm()}
    </Modal>;
  }
  modalAdd() {
    return <Modal
      footer={null}
      title="Add a wish"
      visible={this.state.modalAdd}
      onOk={this.closeAdd}
      onCancel={this.closeAdd}
    >
      {this.addForm()}
    </Modal>;
  }
  modalDelete() {

    return <Modal
      footer={null}
      title="Delete a wish"
      visible={this.state.deleteId !== null}
      onOk={this.closeDelete}
      onCancel={this.closeDelete}
    >
      Do you want to delete the wish ?
      <br />
      <Button type="primary" onClick={this.onFinishDelete} danger>Yes DELETE</Button> <Button onClick={this.closeDelete} type="primary">No</Button>
    </Modal>;
  }
  onFinishAdd(values) {
    var self = this;
    WishService.post(values)
      .then(() => {
        self.loadWish();
        self.closeAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFinishDelete() {
    var self = this;
    WishService.delete(self.state.deleteId)
      .then(() => {
        self.loadWish();
        self.closeDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  addForm() {
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
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add wish
          </Button>
        </Form.Item>
      </Form>
    </div>);

  }
  onFinishEdit(values) {
    var self = this;

    WishService.put(self.state.editId, values)
      .then(() => {
        self.loadWish();
        self.closeEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  editForm() {

    var form = null;
    if (this.state.editRecord !== null) {

      form = (<div className="my-container">
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
            <Input placeholder="Title" />
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
            <Switch defaultChecked={this.state.editRecord.disabled} />
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
      {this.modalDelete()}
      <Button onClick={this.add} type="primary">Add wish</Button>
      <Table columns={this.columns} dataSource={this.state.data} />
    </div>;
  }
}

export default AdminList;
