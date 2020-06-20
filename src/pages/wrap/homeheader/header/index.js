import React, { Component, Children, cloneElement } from 'react';
import Header from '../../components/header';
import Info from '../../components/info';
import { lebraNavbar, active } from './index.css';

class HeaderContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		const {
			children,
			iconName,
			leftContent,
			rightContent,
		} = this.props;
		const rightArray = Children.toArray(rightContent);
		const rightContents = rightArray.concat(<Info />,);
		return (
			<Header
				className={`${lebraNavbar} ${this.props.menuShow ? active : ''}`}
				mode="light"
				iconName={iconName}
				leftContent={leftContent}
				rightContent={rightContents.map((child, i) => cloneElement(child, { key: i }))}
			>
				{children}
			</Header>
		);
	}
}

export default HeaderContainer;
