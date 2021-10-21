import { Component } from 'react';
import { Table, Switch, Pagination, Space, Button, Modal } from 'antd';
import { getUserList, changeAdmin, doDelete } from "@/utils/api";
import AddUser from './addUser'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '用户管理',
            dataSource: [],
            loading: false,
            page: 1,
            size: 10,
            total: 0,
            editUser: {},
            modalTitle: '新增用户'
        };
    }
    componentDidMount() {
        this.searchUser();
    }
    adminChange = (record) => {
        changeAdmin(record).then((res) => {
            if (res !== 1) {
                this.searchUser();
            }
        }).catch(() => {
            this.searchUser();
        })
    }
    pageChange = (page, pageSize) => {
        this.setState({ page: page, size: pageSize }, () => {
            this.searchUser();
        });
    }
    delete = (record) => {
        const { alertMsg, searchUser } = this;
        Modal.confirm({
            title: `删除确认`,
            icon: <ExclamationCircleOutlined />,
            content: `确认删除用户：${record.account}，姓名：${record.name}`,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                return doDelete(record)
                    .then((res) => {
                        if (res) {
                            alertMsg("删除成功！", "success");
                        } else {
                            alertMsg("删除失败，请重试", "error");
                        }
                        searchUser();
                    })
                    .catch(() => {
                        alertMsg("删除失败，请重试", "error");
                        searchUser();
                    });
            }
        });
    }
    edit = (record) => {
        this.setState({ confirmLoading: false, editUser: record, modalTitle: '编辑用户', isModalVisible: true });
    }
    add = () => {
        this.setState({ confirmLoading: false, editUser: {}, modalTitle: '新增用户', isModalVisible: true });
    }
    alertMsg = (msg, type) => {
        switch (type) {
            case 'error':
                Modal.error({ title: msg });
                break;
            case 'success':
                Modal.success({ title: msg });
                break;
            default:
                break;
        }
    }
    handleCancel = () => {
        this.setState({ confirmLoading: false, isModalVisible: false });
    }
    searchUser = () => {
        let param = {
            page: this.state.page,
            size: this.state.size,
            where: {}
        };
        this.setState({ loading: true });
        getUserList(param).then((res) => {
            this.setState({ dataSource: res.result, loading: false, total: res.total });
        })
    }
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '账号',
                dataIndex: 'account',
                key: 'account',
                width: 300
            },
            {
                title: '是否管理员',
                dataIndex: 'is_admin',
                key: 'is_admin',
                width: 350,
                render: (is_admin, record) => {
                    if (is_admin === '1') {
                        return (<Switch defaultChecked onChange={this.adminChange.bind(this, record)} size="small" />);
                    } else {
                        return (<Switch onChange={this.adminChange.bind(this, record)} size="small" />);
                    }
                }
            },
            {
                title: '编辑',
                dataIndex: 'operation',
                key: 'operation',
                width: 180,
                render: (_, record) => {
                    return (
                        <Space>
                            <Button onClick={this.edit.bind(this, record)} type="primary" icon={<EditOutlined />} size={'small'}>
                                编辑
                            </Button>
                            <Button onClick={this.delete.bind(this, record)} icon={<DeleteOutlined />} size={'small'}>
                                删除
                            </Button>
                        </Space>
                    );
                }
            }
        ];
        const { dataSource, loading, size, page, total, isModalVisible, editUser, modalTitle } = this.state;
        const { searchUser, pageChange, handleCancel, alertMsg } = this;
        const pageStyle = {
            float: 'right',
            marginTop: '10px',
            display: 'block'
        }
        if (total === 0) {
            pageStyle.display = 'none';
        } else {
            pageStyle.display = 'block';
        }
        return (
            <div style={{ padding: '20px 24px 50px' }}>
                <Modal title={modalTitle} visible={isModalVisible} onCancel={handleCancel} footer={null} maskClosable={false} destroyOnClose={true} centered={true}>
                    <AddUser close={handleCancel} searchUser={searchUser} alertMsg={alertMsg} thisUser={editUser} />
                </Modal>
                <Space style={{ marginBottom: '10px' }}>
                    <Button onClick={this.add} type="primary" size="small">新增用户</Button>
                </Space>
                <Table dataSource={dataSource} columns={columns} size="small" rowKey={"id"} pagination={false}
                    loading={loading} onChange={searchUser} />
                <Pagination current={page} total={total} defaultPageSize={size} style={pageStyle} onChange={pageChange} />
            </div>
        );
    }
}

export default users;
