import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bee-adapter/dropdown';
import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem } from 'bee-adapter/menus';
import {
	dropdownButtonCont,  btnUpward, btnPullDown, iconStyle, menuStyle,
	menuItem, itemUl, itemLi, liTitle, liRight, currLi
} from './style.css';

class DropdownButton extends Component {
	static propTypes = {
		label: PropTypes.string,
		dataItem: PropTypes.arrayOf(PropTypes.object),
		type: PropTypes.string,
		tenantId: PropTypes.string,
		productLine: PropTypes.string,
	};
	static defaultProps = {
		label: '',
		dataItem: [],
		type: '',
		tenantId: '',
		productLine: '',
	};

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	onVisibleChange = (visible) => {
		this.setState({
			visible,
		});
	}

	handleShow = () => {
		this.setState({
			visible: true,
		});
	}

	// todu 后续需求变更后需要遍历找到对应的事件
	handleSelect = (da) => {
		if (!da) return;
		da.fun(da.name);
		this.setState({
			visible: false,
		});
	}


	render() {
		const { label, dataItem, tenantId } = this.props;
		const item = [];
		dataItem.forEach((da) => {
			item.push(
				<div
					key={da.name}
					className={da.name === tenantId ? `${currLi} ${itemLi}` : itemLi}
					onClick={() => { this.handleSelect(da); }}
					onKeyDown={() => { this.handleSelect(da); }}
					role="presentation"
				>
					<Icon type="firm-introduction" />
					<div className={`${liTitle}`} title={da.value}>{da.value}</div>
					<div className={liRight}>
						<span className={da.type === 1 ? 'blue' : 'red'}>{da.type === 1 ? '团队' : '企业'}</span>
					</div>
				</div>
			);
		});
		const menus = (
			<Menu className={menuStyle} >
				<MenuItem className={`${menuItem}`} >
					<div className={`${itemUl} open_item`}>{item}</div>
				</MenuItem>
			</Menu>
		);
		const arrard = this.state.visible ? 'upward' : 'pull-down';
		return (
			//调整布局，使其可以点击下拉面板即可展开和缩放
			<Dropdown
				overlayClassName="_btn_down"
				getPopupContainer={this.props.getPopupContainer}
				trigger={['click']}
				overlay={menus}
				animation="slide-up"
				onVisibleChange={this.onVisibleChange}
			>
				<div className={dropdownButtonCont}>
					<div className={`home_title`}>
						<span title={label}>{label}</span>
					</div>
					<div
						id="_dropdown_popcontainer"
						className={`${this.state.visible ? btnUpward : btnPullDown} home_title_down `}
					>
						<div><Icon type={arrard} className={iconStyle} /></div>
					</div>
				</div>
			</Dropdown>
		);
	}
}
export default DropdownButton;
