import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import CommonComments from './common_comments';
export default class PCResumeAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	};
	componentDidMount() {

	};

	render() {
		return (
			<div>
				<PCHeader></PCHeader>
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<hr/>
						<CommonComments uniquekey={this.props.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter></PCFooter>
				<BackTop/>
			</div>
		);
	};
}
