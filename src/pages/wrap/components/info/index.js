import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, getContext } from '@u';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';

import InfoContent from './infoContent';
import { win, avator } from './info.css';

@connect(mapStateToProps('userInfo',), {})
class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoDisplay: false,
			currType: 1
		};
	}

	handerClick = () => {
		const { infoDisplay } = this.state;
		this.setState({
			infoDisplay: !infoDisplay,
		});
	}
	componentDidMount() {
		this.getCompanyType();
	}
	// 获取团队、企业  type 0为企业， 1为团队
	getCompanyType = () => {
		const { tenantid } = getContext();
		const {
			userInfo: {
				allowTenants,
			},
		} = this.props;
		const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
		let currType = 1;
		if (curTenant && curTenant.type == 0) {
			currType = 0;
		}
		this.setState({
			currType
		});
	}
	closeInfo = () => {
		this.setState({
			infoDisplay: false
		});
	}

	render() {
		const { userInfo: { userAvatorNew }, } = this.props;
		const { infoDisplay, currType } = this.state;
		return (
			<div className={win}>
				<div className={`${avator} ignoreClass`} onClick={this.handerClick}>
					{
						userAvatorNew
							? <img alt="" src={userAvatorNew} />
							: <div className="avatorImg"></div>
					}
				</div>
				<CSSTransitionGroup
					transitionName={{
						enter: 'animated',
						enterActive: `fadeIn`,
						leave: 'animated',
						leaveActive: `fadeOut`,
					}}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{
						infoDisplay
							?
							<InfoContent
								license={this.props.license}
								closeInfo={this.closeInfo}
								outsideClickIgnoreClass={'ignoreClass'}
								openExitModal={this.props.openExitModal}
								currType={currType}
							/>
							: null
					}

				</CSSTransitionGroup>
			</div>
		)

	}
}
export default Info;

