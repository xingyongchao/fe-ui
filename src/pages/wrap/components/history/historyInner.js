import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';

import onClickOutside from 'react-onclickoutside';
import rootActions from 'store/root/actions';
const { getHistoryList } = rootActions;
import { historyPartInner } from './style.css';

@connect(mapStateToProps('historyList'), { getHistoryList })

@onClickOutside
class HistoryInner extends Component {
	static propTypes = {
		historyList: PropTypes.arrayOf(PropTypes.object),
		getHistoryList: PropTypes.func,
	};
	static defaultProps = {
		historyList: [],
		getHistoryList: () => { },
	};
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentWillMount() {
		// 历史记录需要随时更新， 所以每次重新拉取
		this.props.getHistoryList()
	}

	handleClickOutside(e) {
		e.stopPropagation();
		this.props.closeHistory()
	}

	openHistoryItem = (businessCode, extendParams) => {
		alert(businessCode);
		this.props.closeHistory();
	}



	render() {
		const { historyList } = this.props;
		return (
			<div className={historyPartInner}>
				<div className="inner-header">
					<label className="title">历史记录</label>
					<label className="all">清空</label>
				</div>
				<ul className="inner-list">
					{
						historyList.map((item, key) => {
							return (
								<li className="history-item" key={key}>
									<p onClick={e => this.openHistoryItem(item.businessCode, item.extendParams)}>
										<Icon type="blank-page" />
										<span>{item.title}</span>
									</p>
									<Icon type="dustbin" onClick={() => { console.log(item) }} />
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
export default HistoryInner;

