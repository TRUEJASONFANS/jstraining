import React from 'react';
import { Table, Icon, Row, Col, BackTop, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import PCResumeDeleteLink from './pc_resume_delete_link';
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: name => `${name}`,
    width: '20%',
}, {
    title: '毕业学校',
    dataIndex: 'university',
    width: '20%',
},
{
    title: '学历',
    dataIndex: 'degree',
    width: '20%',
}, {
    title: '电话号码',
    dataIndex: 'phone',
}, {
    title: 'Action', key: 'operation', dataIndex: 'id', render: (id) => <span><Link to={`/viewResume/${id}`}> 编辑</Link><span className="ant-divider" />
        <PCResumeDeleteLink delId={`${id}`}/></span>
}
];
export default class PCResumeContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pagination: {},
            loading: false,
            isLoaded: false
        }
    };
    componentDidMount() {
        this.fetchData();
    }
    handleTableChange(pagination, sorter, filters) {
        this.fetchData()
    }
    fetchData() {
        this.setState({ loading: true });
        var myFetchOptions = {
            method: 'get'
        };
        fetch("http://localhost:3000/api/candidates", myFetchOptions)
            .then(response => response.json())
            .then(json => json.candidates).then(json => {
                this.setState({
                    loading: false,
                    data: json,
                    isLoaded: true
                });
            }
            );
    }
    render() {
        return (
            <div>
                <BackTop />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Table columns={columns}
                            dataSource={this.state.data}
                            rowKey={record => record.id}
                            loading={this.state.loading}
                            onChange={this.handleTableChange.bind(this)}
                        />
                    </Col>
                </Row>
            </div>
        );
    };
}
