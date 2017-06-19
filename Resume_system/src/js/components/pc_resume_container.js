import React from 'react';
import { Table, Icon, Row, Col, BackTop } from 'antd';
import { Link } from 'react-router';
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: name => `${name}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
    width: '20%',
},
{
    title: 'Degree',
    dataIndex: 'degree',
    width: '20%',
}, {
    title: 'Phone Number',
    dataIndex: 'phone',
}, { title: 'Action', key: 'operation', dataIndex: 'id', render: (id) => <Link to={`/viewResume/${id}`}> View</Link> }
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
        if (this.state.isLoaded) {
            reuturn;
        }
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
