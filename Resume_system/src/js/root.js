import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Redirect, IndexRoute } from 'react-router';
import { Button } from 'antd';
import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';
import PCResumeAdd from './components/pc_resume_add';
import PCResumeEdit from './components/pc_resume_edit';
import App from './components/App';
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<Router history={hashHistory}>
					<Route path="/" component={App} >
						<IndexRoute component={PCIndex} />
						<Route path="/addResume" component={PCResumeAdd} />
						<Route path="/viewResume/:id" component={PCResumeEdit} />
					</Route>
				</Router>
			</div>
		);
	};
}
ReactDOM.render(
	<Root />, document.getElementById('mainContainer'));
