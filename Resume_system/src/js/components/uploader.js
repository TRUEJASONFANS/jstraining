import React from 'react';
import {Upload, message, Button, Icon, Modal} from 'antd';
const props = {
    name: 'file',
    action: '//localhost:3000/api/upload',
    headers: {
        "Access-Control-Allow-Origin":"*",
        authorization: 'authorization-text'
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};
export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false
        };
    };
    setModalVisible(value) {
        this.state = {
            modalVisible: value
        };
        this.props.uploaderVisiable(value);
    }
    render() {
        return (
            <Modal title="上传简历" visible={this.props.isVisible} onCancel={()=>this.setModalVisible(false)}  onOk={() => this.setModalVisible(false)} okText="关闭">
                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/>
                        Click to Upload
                    </Button>
                </Upload>
            </Modal>
        );
    };
}
