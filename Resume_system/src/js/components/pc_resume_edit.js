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
		var myInit = {
			method: "POST",
		};
		console.log("http://localhost:3000/api/updateCandidate/" + this.props.candidate_id + "/" + this.props.Key + "/" + this.state.value);
		fetch("http://localhost:3000/api/updateCandidate/" + this.props.candidate_id + "/" + this.props.Key + "/" + this.state.value, myInit).then(

		).catch(

		);
	}
	edit = () => {
		this.setState({ editable: true });
	}
	componentWillReceiveProps = function (nextProps) {
		if (nextProps.value) {
			this.setState({
				value: nextProps.value
			});
		}
	}
	render() {
		const { value, editable, label } = this.state;
		return (
			<div className="editable-cell">
				{
					editable ?
						<div className="editable-cell-input-wrapper">
							<Input
								value={this.state.value}
								onChange={this.handleChange}
								onPressEnter={this.check}
								addonBefore={label}
							/>
							<Icon
								type="check"
								className="editable-cell-icon-check"
								onClick={this.check}
							/>

						</div>
						:
						<div className="editable-cell-text-wrapper">
							<span class='editable-cell-text'>{label} : </span>
							{this.state.value || ' '}
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
						<br />
						<EditableCell value={data.name} label='姓名' Key='name' candidate_id={data.id} />
						<EditableCell value='' label='学历' Key='degree' candidate_id={data.id} />
						<EditableCell value='' label='毕业学校' Key='university' candidate_id={data.id} />
						<EditableCell value={data.phone} label='电话' Key='phone' candidate_id={data.id} />
						<EditableCell value={data.email} label='邮箱' Key='email' candidate_id={data.id} />
						<EditableCell value='' label='简历' Key='resume' candidate_id={data.id} />
						<div className="clearfix">
							<Upload {...resume_upload_props}>
								{fileList.length >= 1 ? null : resume_upload_button}
							</Upload>
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
						</div>
						评价
						<Input type="textarea" rows={4} />
					</Col>
				</Row>
				<PCFooter></PCFooter>
			</div>
		);
	};
}
