import { Component } from 'react';
import { Table, Switch, Pagination, Space, Button, Modal } from 'antd';
import { getUserList, changeAdmin } from "@/utils/api";
import AddUser from './addUser'

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
            isModalVisible: false
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
        console.log(page)
        console.log(pageSize)
    }
    edit = (record) => {
        console.log(record)
    }
    add = () => {
        this.setState({ confirmLoading: false, isModalVisible: true });
    }
    alertError = (msg) => {
        Modal.error({
            title: msg
        });
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
                        <Button onClick={this.edit.bind(this, record)} type="primary">
                            编辑
                        </Button>
                    );
                }
            }
        ];
        const { dataSource, loading, page, size, total, isModalVisible } = this.state;
        const { searchUser, pageChange, handleCancel } = this;
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
                <Modal title="新增用户" visible={isModalVisible} onCancel={handleCancel} footer={null} maskClosable={false}>
                    <AddUser close={handleCancel} />
                </Modal>
                <Space style={{ marginBottom: '10px' }}>
                    <Button onClick={this.add} type="primary" size="small">新增用户</Button>
                </Space>
                <Table dataSource={dataSource} columns={columns} size="small" rowKey={"id"} pagination={false}
                    loading={loading} onChange={searchUser} />
                <Pagination defaultCurrent={page} total={total} defaultPageSize={size} style={pageStyle} onChange={pageChange} />
            </div>
        );
    }
}

export default users;
