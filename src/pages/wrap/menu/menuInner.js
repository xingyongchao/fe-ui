import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, getContext } from '@u';
import Icon from 'pub-comp/icon';
import Menu, { SubMenu } from 'bee-adapter/menus';
import onClickOutside from 'react-onclickoutside';
import rootActions from 'store/root/actions';
const { setMenuKeys } = rootActions;
import {
	sideBar, sideBarList, sideBarListItem, last_item,
	item1_text, item2_text, dot, menuContainer, workbenchClass
} from './style.css';
import menuDefault from 'assets/image/menuDefault.svg';

const { Item } = Menu;

// 来获取菜单的深度
function getChildrenDeep(menuItems, initialDeep) {
	let maxDeep = initialDeep;
	let computedDeep = initialDeep;
	function loop(menuItems) {
		menuItems.forEach(({ children }) => {
			if (children.length > 0) {
				++computedDeep;
				loop(children);
			}
		});
		if (maxDeep < computedDeep) maxDeep = computedDeep;
		computedDeep = 1;
	}
	loop(menuItems);
	return maxDeep;
}

@connect(
	mapStateToProps(
		'allMenuList',
		'menuKeys',
		'menuItemCodes',
	),
	{
		setMenuKeys,
	},
)

@onClickOutside
class MenuBarInner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: [],
			selectedKeys: [],
		}
		this.sideBarAllSub = {};//所有在sideBarList展示的数据
		this.timer = null;
	}

	componentDidMount() {
		const { allMenuList } = this.props;
		if (allMenuList.length) {
			this.rendList(allMenuList);
		}
	}

	// 记录上次打开的节点目录
	rendList = (payload) => {
		const { menuKeys } = this.props;
		this.setState({
			openKeys: menuKeys.openKeys || [payload[0].menuBarId],
			selectedKeys: menuKeys.selectedKeys || [payload[0].menuItems[0].menuItemId],
			currentSubBar: menuKeys.currentSubBar || { data: payload[0].menuItems[0].children, name: payload[0].menuItems[0].menuItemName },
		})
	}

	// 二级菜单
	makeSubMenus = (menus, isTop, i,) => {
		++i;
		const result = [];
		menus.forEach(({ menuItemId: id, menuItemName: name, children, serviceCode, menuItemCode }) => {
			this.setSideBarAllSub(id, name, children);
			result.push(
				<Item
					key={id}
					style={isTop ? { fontSize: '14px' } : null}
					onMouseEnter={this.handleEnter}
					onMouseLeave={this.handleLeave}
				>
					{
						!children.length
							?
							<span className={`item_${i} ${last_item}`} title={name} onClick={e => this.openService(serviceCode, menuItemCode)}>
								<p className={item2_text}>{name}</p>
								<span className={dot}>.</span>
							</span>
							:
							<span className={`item_${i} ${last_item}`} title={name}>
								<p className={item2_text}>{name}</p>
								<Icon type='forward2' className="itemIcon"></Icon>
							</span>
					}
				</Item>
			)
		});
		return result;
	}
	// isTop:判断是否是一级菜单,一级菜单
	makeMenus = (menus, isTop, i) => {
		++i;
		const result = [];
		menus.forEach(({ menuItems, menuBarIcon, menuBarId: id, menuBarName: name }) => {
			result.push(
				<SubMenu
					key={id}
					title={
						<span className={`item_${i}`} >
							<img src={menuBarIcon || menuDefault} />
							<p className={item1_text} title={name}>{name}</p>
							<Icon type="forward2" />
						</span>
					}>
					{this.makeSubMenus(menuItems, false, i)}
				</SubMenu>
			)
		});
		return result;
	}
	// 三级，四级菜单
	renderList = () => {
		if (!this.state.currentSubBar) return null;
		const {
			currentSubBar: {
				data: cur
			}
		} = this.state;
		const result = [];
		const deep = getChildrenDeep(cur, 1);
		cur.forEach(({ children, menuItemName, menuItemId, serviceCode, menuItemCode }) => {
			// deep>1表示有4级存在
			if (deep > 1) {
				let dom = [];
				// 情况1每项都有4级；情况2有些只到3级，那么3级占位4级展示
				if (children.length > 0) {
					children.forEach(({ menuItemName, menuItemId, serviceCode, menuItemCode }) => {
						dom.push(
							<li className="bottomBar um-ellipsis"
								key={menuItemId}
								onClick={e => this.openService(serviceCode, menuItemCode)}
								title={menuItemName}
								style={getContext().locale === "en_US" ? { width: 180 } : {}}
							>
								{menuItemName}
							</li>
						)
					});
					result.push(
						<li className={sideBarListItem} key={menuItemId}>
							<span className="sideBarListItemName">{menuItemName}</span>
							<ul className="bottomBarPanel">{dom}</ul>
						</li>
					)
				} else {
					result.push(
						<li className={sideBarListItem} key={menuItemId}>
							{/* <span className="sideBarListItemName" style={{ opacity: 0, visibility: 'hidden' }}>{'default'}</span> */}
							<ul className="bottomBarPanel mixHasNoThree">
								<li className="bottomBar" onClick={e => this.openService(serviceCode, menuItemCode)} title={menuItemName}>
									{menuItemName}
								</li>
							</ul>
						</li>
					)
				}
			} else {
				//deep=1表示最多3级，3级按照bottombar展示
				result.push(
					<li className="pureBottom bottomBar"
						key={menuItemId}
						title={menuItemName}
						onClick={e => this.openService(serviceCode, menuItemCode)}>
						{menuItemName}
					</li>
				)
			}
		})
		return result;
	}

	// 点击bottomBar打开页签，bottomBar是一二级菜单中二级，一二三级菜单三级，一二三四级菜单四级
	openService = (serviceCode, menuItemCode) => {
		const { openKeys, selectedKeys, currentSubBar } = this.state;
		const { menuItemCodes } = this.props;
		menuItemCodes[serviceCode] = menuItemCode;
		this.props.closeMenu();
		this.props.setMenuKeys({ menuKeys: { openKeys, selectedKeys, currentSubBar }, menuItemCodes: menuItemCodes });
	}
	// 获取所有需要在三四级区域展示的数据
	setSideBarAllSub = (id, name, data) => {
		this.sideBarAllSub[id] = { name: name, data: data }
	}

	handleEnter = (e) => {
		this.timer = setTimeout(() => {
			this.timer = 0;
			this.handleClick(e.key);
		}, 250);
	}

	handleLeave = (e) => {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = 0;
			return;
		};
	}

	handleClick = (key) => {
		this.setState({
			selectedKeys: [key],
			currentSubBar: this.sideBarAllSub[key]
		});
	}

	onOpenChange = (Keys) => {
		const { allMenuList } = this.props;
		const openKey = Keys.length > 1 ? [Keys[Keys.length - 1]] : Keys;
		const curData = allMenuList.filter(item => {
			return item.menuBarId === openKey[0]
		});
		const selectedKey = curData.length ? [curData[0].menuItems[0].menuItemId] : [];
		this.setState({
			openKeys: openKey,
			selectedKeys: selectedKey,
			currentSubBar: selectedKey.length ? this.sideBarAllSub[selectedKey[0]] : this.state.currentSubBar
		});
	}

	handleClickOutside(e) {
		e.stopPropagation();
		const { openKeys, selectedKeys, currentSubBar } = this.state;
		this.props.closeMenu();
		// this.props.setMenuKeys({ openKeys, selectedKeys, currentSubBar });
		this.props.setMenuKeys({ menuKeys: { openKeys, selectedKeys, currentSubBar } });

	}

	render() {
		let { allMenuList } = this.props;
		let { openKeys, selectedKeys } = this.state;
		return (
			<div className={sideBar} style={{ height: window.innerHeight > 900 ? 3 * window.innerHeight / 5 : 2 * window.innerHeight / 3 }}>
				<div className={`${menuContainer} ${workbenchClass}`} style={{ width: 220 }}>
					<Menu
						onOpenChange={this.onOpenChange}
						openKeys={openKeys}
						selectedKeys={selectedKeys}
						mode="inline"
					>
						{this.makeMenus(allMenuList, true, 0)}
					</Menu>
				</div>
				<div className={sideBarList}>
					{this.renderList()}
				</div>
			</div>
		);
	}
}
export default MenuBarInner;

