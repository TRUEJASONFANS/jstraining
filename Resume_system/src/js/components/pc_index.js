import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCResumeContainer from './pc_resume_container';
export default class PCIndex extends React.Component {
	render() {
		return (
			<div>
				<PCHeader></PCHeader>
				<PCResumeContainer></PCResumeContainer>
				<PCFooter></PCFooter>
			</div>
		);
	};
}
