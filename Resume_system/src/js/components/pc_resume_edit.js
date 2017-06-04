import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { BackTop, Row, Col, Icon, Input, Upload, Modal } from 'antd';
class EditableCell extends React.Component {
	state = {
		value: this.props.value,
		editable: false,
		label: this.props.label
	}
	handleChange = (e) => {
		const value = e.target.value;
		this.setState({ value });
	}
	check = () => {
		this.setState({ editable: false });
		if (this.props.onChange) {
			this.props.onChange(this.state.value);
		}
	}
	edit = () => {
		this.setState({ editable: true });
	}
	render() {
		const { value, editable, label } = this.state;
		return (
			<div className="editable-cell">
				{
					editable ?
						<div className="editable-cell-input-wrapper">
							{label}:
							<Input
								value={this.props.value}
								onChange={this.handleChange}
								onPressEnter={this.check}
							/>
							<Icon
								type="check"
								className="editable-cell-icon-check"
								onClick={this.check}
							/>
						</div>
						:
						<div className="editable-cell-text-wrapper">
							{label}:
							{this.props.value || ' '}
							<Icon
								type="edit"
								className="editable-cell-icon"
								onClick={this.edit}
							/>
						</div>
				}
			</div>
		);
	}
}
export default class PCResumeEdit extends React.Component {
	state = {
		value: this.props.value,
		editable: this.props.editable || false,
		previewVisible: false,
		previewImage: '',
		fileList: [],
		data: {}
	}
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleChange = ({ fileList }) => this.setState({ fileList })
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		console.log("http://localhost:3000/api/candidates/" + this.props.params.id);
		fetch("http://localhost:3000/api/candidates/" + this.props.params.id, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({
					data: json
				});
			}
			);
	}
	render() {
		const resume_upload_props = {
			listType: 'picture-card',
			action: '//jsonplaceholder.typicode.com/posts/',
			onChange: this.handleChange
		};
		const resume_upload_button = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { previewVisible, previewImage, fileList, data } = this.state;
		return (
			<div>
				<PCHeader></PCHeader>
				<BackTop />
				<Row gutter={8}>
					<Col span={6} />
					<Col span={4}>
						<EditableCell value={data.name} label= '姓名' />
							<EditableCell value='' label='学历' />
							<EditableCell value='' label='毕业学校' />
							<EditableCell value={data.phone} label='电话' />
							<EditableCell value={data.email} label='邮箱' />
							<EditableCell value='' label='简历' />
							<div className="clearfix">
								<Upload {...resume_upload_props}>
									{fileList.length >= 1 ? null : resume_upload_button}
								</Upload>
								<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
									<img alt="example" style={{ width: '100%' }} src={previewImage} />
								</Modal>
							</div>
							<Input type="textarea" rows={4} />
					</Col>
				</Row>
					<PCFooter></PCFooter>
			</div>
				);
	};
}
