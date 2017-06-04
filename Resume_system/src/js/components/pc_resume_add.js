import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, message,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Dragger = Upload.Dragger;
class PCResumeAdd extends React.Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		previewVisible: false,
		previewImage: '',
		fileList: []
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	handleCancel = () => this.setState({ previewVisible: false })
	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleChange = ({ fileList }) => this.setState({ fileList })
	render() {
		const { previewVisible, previewImage, fileList } = this.state;	
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};
		const chinaPhonePrefix = getFieldDecorator('prefix', {
			initialValue: '86',
		})(
			<Select className="icp-selector">
				<Option value="86">+86</Option>
			</Select>
			);
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
		return (<div>
			<PCHeader></PCHeader>
			<br />
			<Form onSubmit={this.handleSubmit}>
				<FormItem
					{...formItemLayout}
					label="姓名"
					hasFeedback
				>
					{getFieldDecorator('name', {
						rules: [{
							required: true, message: '请输入姓名',
						}],
					})(
							<Input />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={(
						<span>
							学历&nbsp;
						</span>
					)}
					hasFeedback
				>
					{getFieldDecorator('degree', {
						rules: [{ required: true, message: '学历程度:本科,硕士,博士.', whitespace: true }],
					})(
							<Input />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="毕业学校"
					hasFeedback
				>
					{getFieldDecorator('school', {
						rules: [{
							required: true, message: '请输入毕业学校',
						}],
					})(
							<Input />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="籍贯"
				>
					{getFieldDecorator('residence', {
						rules: [{ required: false, message: '请输入籍贯' }],
					})(
						<Input />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="Phone Number"
				>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: '请输入电话号码' }],
					})(
							<Input addonBefore={chinaPhonePrefix} />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="简历"
				>
					<div className="clearfix">
						<Upload {...resume_upload_props}>
							{fileList.length >= 1 ? null : resume_upload_button}
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
							<img alt="example" style={{ width: '100%' }} src={previewImage} />
						</Modal>
					</div>
				</FormItem>
				<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked',
					})(
						<Checkbox>I have read the <a href="">agreement</a></Checkbox>
						)}
				</FormItem>
				<FormItem {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit" size="large">注册</Button>
				</FormItem>
			</Form>
			<PCFooter></PCFooter>
		</div >);
	}
}
export default PCResumeAdd = Form.create()(PCResumeAdd);



