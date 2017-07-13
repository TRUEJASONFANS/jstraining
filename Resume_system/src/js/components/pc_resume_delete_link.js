import { Popconfirm, message } from 'antd';
import React from 'react';
import { withRouter } from 'react-router';

class PCResumeDeleteLink extends React.Component {
    state = {
        delId: this.props.delId,
    }
    confirm(e) {
        var myFetchOptions = {
            method: 'delete'
        };
        console.log(this.props.delId);
        fetch("http://localhost:3000/api/candidates/" + this.state.delId, myFetchOptions)
            .then(response => {
                message.success('成功删除');
                console.log(this.props.router);
                window.location.reload();
            }).catch(function (error) {
                console.log(error.message);
                message.success('删除失败');
                window.location.reload();
            });

    }

    cancel(e) {
        console.log(e);
        message.error('Click on No');
    }
    render() {
        return <Popconfirm title="确定要删除这条简历吗？" onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="Yes" cancelText="No">
            <a href="/">删除</a>
        </Popconfirm>
    }
}
export default withRouter(PCResumeDeleteLink);