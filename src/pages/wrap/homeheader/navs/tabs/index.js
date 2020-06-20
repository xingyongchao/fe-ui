import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, } from '@u';
import Icon from 'pub-comp/icon';
import rootActions from 'store/root/actions';
import Pulldown from './pulldown';

import { tab, active, first, pagesign, navLi, close, popover, pop_content } from './style.css';

const { showTabs} = rootActions;
@connect(
	mapStateToProps(
		'tabs',
		'activeCarrier',
		'iframeTabs',
		'retract',
	),
	{
		showTabs,
	},
)

class Tabmenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			refeshshow: false,
			refechIndex: -1,
		};
		this.pullW = 36;
		this.listW = 154;
		this.menuW = 80;
	}

	componentWillMount() {
		window.addEventListener('resize', this.resizeHandler);
	}

	componentDidMount() {
		this.resizeHandler();
	}

	componentWillReceiveProps({ tabs: nextTabs }) {
		const { tabs: oldTabs } = this.props;
		if (oldTabs.length !== nextTabs.length) {
			const areaWidth = this.tabsArea.clientWidth;
			this.setState({
				width: areaWidth,
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeHandler);
	}

	resizeHandler = () => {
		this.setState({
			width: this.tabsArea.clientWidth,
		});
	}

	closeWin = (param) => {
		console.log(param);
	}

	getTabsAndMores = (totalTab, areaWidth) => {
		let mores = [];
		let tabs = [];
		const totalTabs = totalTab;
		const width = this.props.retract ? areaWidth - this.pullW : areaWidth - this.pullW - this.menuW;
		const maxTabsNum = Math.floor(width / this.listW);
		if (totalTabs.length > maxTabsNum) {
			tabs = totalTabs.filter((item, index) => {
				return index < maxTabsNum;
			});
			mores = totalTabs.filter((item, index) => {
				return index >= maxTabsNum;
			});
		} else {
			tabs = totalTabs;
		}
		return {
			tabs,
			mores,
			maxTabsNum
		}
	}

	setNavClass = (id, index) => {//portal，整理classname
		const activeCarrier = this.props.activeCarrier;
		return `${navLi} ${id === activeCarrier ? active : ''} ${activeCarrier == 'home' && index == 0 ? first : ''}`
	}

	openService = (item, isShow = false) => {
		console.log(item);
	}


	showTabs = (item) => {
		const { showTabs } = this.props;
		showTabs(item);
	}

	refreshShow = (refeshshow, index) => {
		const refechIndex = refeshshow ? index : -1;
		this.setState({
			refeshshow: !!refeshshow,
			refechIndex,
		});
	}


	getText = (hasWidget) => {
		return hasWidget ? "移除首页" : "添加首页";
	}

	render() {
		const { tabs: totalTabs, activeCarrier, } = this.props;
		const { width, refeshshow, refechIndex } = this.state;
		const { tabs, mores } = this.getTabsAndMores(totalTabs, width);
		return (
			<div className={tab} ref={(c) => { this.tabsArea = c; }}>
				<ul>
					{
						tabs && tabs.map((item, index) => {
							return (
								<li
									className={this.setNavClass(item.id, index)}
									key={`${item.id}`}
									onMouseEnter={() => { this.refreshShow(true, index) }}
									onMouseLeave={() => { this.refreshShow(false, index) }}
								>
									<Icon type="blank-page" className={pagesign} />
									<p onClick={() => { this.showTabs(item) }} title={item.title}>{item.title}</p>
									<div className={close} onClick={() => { this.closeWin(item) }}>
										<Icon type="error3" />
									</div>
									{
										item.id !== activeCarrier || refechIndex !== index || !refeshshow || item.type === "locale" ? null :
											<div className={popover}>
												<div className={`${pop_content} um-box`}>
													<button className='um-box-center' onClick={() => { console.log("刷新按钮点击") }}>
														<Icon type="refresh2" />
														<span>刷新</span>
													</button>
													{
														<button disabled={item.id.indexOf("_diwork_") > -1 || item.type === "url" ? true : false} className="um-box-center" onClick={() => { console.log("添加或删除") }}>
															{item.hasWidget ? <Icon type="error3" /> : <Icon type="add" />}
															<span title={this.getText(item.hasWidget)}>{this.getText(item.hasWidget)}</span>
														</button>
													}
												</div>
											</div>
									}
								</li>
							)
						})
					}
				</ul>
				<Pulldown width={this.pullW} items={mores} closeWin={this.closeWin} />
			</div>
		);
	}
}
export default Tabmenu;
