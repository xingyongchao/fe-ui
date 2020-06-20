import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps, logout } from '@u';
import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem, SubMenu } from 'bee-adapter/menus';
import { info, tleft, tright, list, out, menu, menuEn, selectType, workbenchClass, backgroundStyle } from './info.css';


@connect(
	mapStateToProps(
		'content',
		'userInfo',
		'themeList',
		'currentThemeId',
	),
	{}
)
@onClickOutside
class InfoContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount() { }

	// outside 装饰器方法
	handleClickOutside() {
		const { closeInfo } = this.props;
		closeInfo();
	}



	render() {
		const { userInfo: {
			userAvatorNew, userName
		}, themeList, currentThemeId } = this.props;

		return (
			<div className={info}>
				<dl>
					<dt>
						<div className={tleft}>
							{
								userAvatorNew
									? <img alt="" src={userAvatorNew} />
									: <div className="avatorImg"></div>
							}
						</div>
						<div className={tright}>
							<span title={userName}>{userName}</span>
							<ul>
								<li>
									<Icon type="Internet2" title="动态" />
								</li>
								<li>
									<Icon type="glory" title="荣耀" />
								</li>
							</ul>
						</div>
					</dt>
					<dd>
						<ul>
							<li>
								<div className={list}>
									<Icon type="personal-details" className="userinfoicon" />
									<span>企业管理</span>
								</div>
							</li>
							<li>
								<div className={list}>
									<Icon type="account-management" />
									<span>邀请成员</span>
								</div>
							</li>
						</ul>
					</dd>
					<dd>
						<ul>
							<li>
								<div className={list}>
									<Icon type="language" />
									<span title="我的首选">我的首选</span>
								</div>
							</li>
							<li className={`${workbenchClass}`}>
								<Menu className={`${menu} `} selectedKeys={[currentThemeId]}>
									<SubMenu
										key="theme"
										title={
											<div className={list}>
												<Icon font="beijingse" />
												<span>背景色定义</span>
											</div>
										}
									>
										{
											themeList.map(item => {
												return (
													<MenuItem key={item.id}>
														<div className="um-box">
															<div className={backgroundStyle} style={{ background: item.background }}></div>
															{item.name}
															<Icon type="Determine" className={selectType} />
														</div>
													</MenuItem>
												)
											})
										}
									</SubMenu>
								</Menu>
							</li>
						</ul>
					</dd>
				</dl>
				<div className={out}>
					<div className={list} onClick={() => { logout() }}>
						<Icon type="cancellation" className="exit" />
						<span>注销</span>
					</div>
				</div>

			</div>
		)

	}
}
export default InfoContent;

