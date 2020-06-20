import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps } from '@u';

// 业务组件
import DropdownButton from './dropdown';
import Header from './header';
import Navs from './navs';
import menuImg from 'assets/image/menu.svg';
import u8clogo from 'assets/image/yonSuite.svg';

/*   actions   */
import rootActions from 'store/root/actions';
const { changeRetract } = rootActions;
import { logostyle } from './style.css';
@connect(
	mapStateToProps(
		'retract',
		'userInfo',
	),
	{
		changeRetract,
	},
)
class Homeheader extends Component {
	static propTypes = {
		userInfo: PropTypes.shape({
			name: PropTypes.string,
			company: PropTypes.string,
			userAvator: PropTypes.string,
		}),
		openMenu: PropTypes.func,
		openHistory: PropTypes.func,
	};
	static defaultProps = {
		userInfo: {},
		openMenu: () => { },
		openHistory: () => { },

	};
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentWillMount() {

	}

	getLeftContent() {
		const {
			userInfo: {
				company,
				allowTenants,
				currentTeamConfig,
			},
			productLine
		} = this.props;
		const tenantId = currentTeamConfig && currentTeamConfig.tenantId;
		const dom = <DropdownButton
			getPopupContainer={() => document.getElementById('home_header')}
			label={company}
			tenantId={tenantId}
			type="home"
			productLine={productLine}
			dataItem={
				allowTenants.map(({
					tenantId: name,
					tenantName: value,
					team: type,
				}) => ({
					name,
					value,
					type,
					fun: this.handleClickFn,
				}))
			}
		/>
		return dom;
	}

	handleClickFn = (tenantId) => {
		console.log(tenantId);
	}

	render() {
		const { retract, style, openMenu, openHistory, menuShow } = this.props;
		const {
			userInfo: {
				currentTeamConfig,
			},
		} = this.props;
		if (!currentTeamConfig) return null;
		const title = <a href='#'><img className={logostyle} alt="" src={u8clogo} /></a>;
		return (
			<div className="diwork-header-fixed" id="home_header" style={style}>


				<CSSTransitionGroup
					transitionName={{
						enter: 'animated',
						enterActive: `fadeIn`,
						leave: 'animated',
						leaveActive: `fadeOut`,
					}}
					transitionEnterTimeout={120}
					transitionLeaveTimeout={100}
				>
					{
						retract
							?
							<Header
								leftContent={this.getLeftContent()}
								iconName={
									<img src={menuImg}
										className="ignoreClass-menu"
										onClick={openMenu}
									/>
								}
								menuShow={menuShow}
							>
								{title}
							</Header>
							: null
					}
				</CSSTransitionGroup>

				<Navs openMenu={openMenu} openHistory={openHistory} menuShow={menuShow} />
			</div>
		);
	}
}
export default Homeheader;
