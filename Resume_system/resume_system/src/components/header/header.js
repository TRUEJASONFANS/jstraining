import React from 'react';
import { Row, Col } from 'antd';
import {Menu, Icon, Tabs, message, Form, Button} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Logo  from '../../images/logo.png';

class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0,
		};
	};

	componentWillMount() {
		if (localStorage.userid != '') {
			this.setState({ hasLogined: true });
			this.setState({ userNickName: localStorage.userNickName, userid: localStorage.userid });
		}
	};

	setModalVisible(value) {
		this.setState({ modalVisible: value });
	};
	handleClick(e) {
		if (e.key === "register") {
			this.setState({ current: 'register' });
			this.setModalVisible(true);
		} else {
			this.setState({ current: e.key });
		}
	};
	handleSubmit(e) {
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
			+ "&username=" + formData.userName + "&password=" + formData.password
			+ "&r_userName=" + formData.r_userName + "&r_password="
			+ formData.r_password + "&r_confirmPassword="
			+ formData.r_confirmPassword, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({ userNickName: json.NickUserName, userid: json.UserId });
				localStorage.userid = json.UserId;
				localStorage.userNickName = json.NickUserName;
			});
		if (this.state.action == "login") {
			this.setState({ hasLogined: true });
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};
	callback(key) {
		if (key ===1) {
			this.setState({ action: 'login' });
		} else if (key === 2) {
			this.setState({ action: 'register' });
		}
	};
	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({ hasLogined: false });
	};
	render() {
		let { getFieldProps } = this.props.form;
		const userShow = this.state.hasLogined
			? <Menu.Item key="logout" class="register">
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
					<Link target="_blank">
					<Button type="dashed" htmlType="button">个人中心</Button>
				</Link>
				&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</Menu.Item>
			: <Menu.Item key="register" class="register">
				<Icon type="appstore" />注册/登录
			</Menu.Item>;
		return (
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src={Logo} alt="logo" />
							<span>Resume System</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="index">
								<Link to={`/`}>
								<Icon type="home" />首页
								</Link>
							</Menu.Item>
							<Menu.Item key="add_resume">
								<Link to={`/addResume`}>
									<Icon type="book" />添加简历
								</Link>
							</Menu.Item>
							<Menu.Item key="statistic">
							<Link to={`/stat`}>
								<Icon type="database" />统计
								</Link>
							</Menu.Item>
							{/* {userShow} */}
						</Menu>					
					</Col>
					<Col span={2}></Col>
				</Row>
		);
	};
}
export default PCHeader = Form.create({})(PCHeader);
