import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Dropdown from 'bee-adapter/dropdown';
import Menu from 'bee-adapter/menus';
import Icon from 'pub-comp/icon';
import Button from 'bee-adapter/button';
import { pulldown, dropdown, close, blackpage, error } from './style.css';
const { Item, Divider } = Menu;

@connect(
	mapStateToProps(
		'tabs',
	), {},
)
class Pulldown extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {

	}

	handleClick = (e, item) => {
		e.stopPropagation();
		console.log(item);
	}

	onSelect = (selectItem) => {
		console.log(selectItem);
	}

	render() {
		const { tabs, items } = this.props;
		const menus = (
			<Menu
				onClick={this.onSelect}
				className={dropdown}
			>
				<Item key="close" title="关闭全部页签" className={close}>关闭全部页签</Item>
				{
					items.length ? <Divider /> : null
				}
				{
					items.length && items.map((item) => {
						return (
							<Item key={item.id} attribute={item}>
								<Icon type="blank-page" className={blackpage} />
								{item.title}
								<Icon type="error3" className={error} onClick={(e) => this.handleClick(e, item)} />
							</Item>
						)
					})
				}
			</Menu>
		);
		return (
			<div className={pulldown} style={{ width: this.props.width }}>
				<Dropdown
					trigger={['click']}
					overlay={menus}
					animation="slide-up"
					overlayClassName="close_tabs"
				>
					<Button disabled={!tabs.length}><Icon type="More" /></Button>
				</Dropdown>
			</div>
		);
	}
}
export default Pulldown;
