import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps } from '@u';
import Homeheader from './homeheader';
import Menu from './menu';


@connect(
	mapStateToProps(
		'retract',
	),
	{},
)
class Wrap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuShow: false,//菜单栏
		};
		this.height = 72;
		this.nav = 32;

	}

	componentDidMount() {

	}

	openMenu = () => {
		this.setState({ menuShow: !this.state.menuShow, });
	}

	closeMenu = () => {
		this.setState({ menuShow: false, });
	}

	setMenuStyle = () => {//设置顶部menu  top值
		const { retract } = this.props;
		const style = { top: retract ? this.height - this.nav : this.nav };
		return style;
	}

	render() {
		return (
			<div className='um-win'>
				<Homeheader openMenu={this.openMenu} menuShow={this.state.menuShow} />
				<Menu
					menuShow={this.state.menuShow}
					openMenu={this.openMenu}
					closeMenu={this.closeMenu}
					style={this.setMenuStyle()}
				/>
			</div>
		);
	}
}
export default Wrap;
