import { handleActions } from 'redux-actions';
import { destoryLoadingFunc, createLoadingFunc } from 'pub-comp/loading';
import { getContext } from '@u';
import actions from './actions';

const {
	requestStart,
	requestSuccess,
	openRoot,
	showTabs,
	getAllMenuList,
	getHistoryList,
	changeRetract,    // 更改header是否收起
	setMenuKeys,    // 记录大菜单最后打开的位置
} = actions;

const defaultState = {
	userInfo: window.getUserInfo(), // userinfo
	content: "workbench",      // 默认登录动作， workbench/protal
	defaultDesktop: getContext().defaultDesktop,
	productLine: getContext().productLine,
	retract: true,  // header合并一个
	tabs: [
		{
			id: '1',   // id  唯一  service的 即 servicecode
			title: '组件样例',  // 页签显示标题
			type: 'locale',  // 类型， 本地 还是 服务
		},
		{
			id: '2',   // id  唯一  service的 即 servicecode
			title: '服务样例',  // 页签显示标题
			type: 'service',  // 类型， 本地 还是 服务
		},
		{
			id: '3',   // id  唯一  service的 即 servicecode
			title: 'URL样例',  // 页签显示标题
			type: 'url',  // 类型， 本地 还是 服务
		},
	],     // 多页签存储
	activeCarrier: 'home',
	// 当前页签id
	allMenuList: [],  // 菜单项
	historyList: [],  // 历史记录
	menuKeys: {}, // 设定菜单那里选中的keys
	menuItemCodes: {},
	currentThemeId: window.getUserInfo && window.getUserInfo().defaultTheme || "grey",
	themeList: [
		{ id: "grey", background: "linear-gradient(360deg,#CBD0D1 0%,rgba(181,185,188,1) 100%)", color: "#333333", editColor: "#505766", name: "典雅灰" },
		{ id: "paleblue", background: "linear-gradient(180deg,rgba(177,189,197,1) 0%,rgba(203,209,210,1) 100%)", color: "#333333", editColor: "#505766", name: "淡雅蓝" },
		{ id: "yellow", background: "linear-gradient(180deg,rgba(208,202,191,1) 0%,rgba(237,235,232,1) 100%)", color: "#333333", editColor: "#505766", name: "莫兰迪黄" },
		{ id: "blue", background: "linear-gradient(359deg,rgba(105,111,124,1) 0%,rgba(65,76,90,1) 100%)", color: "#ffffff", editColor: "#ffffff", name: "星空蓝" },
	],
};

const reducer = handleActions({
	[requestStart](state) {
		createLoadingFunc({ text: '加载中...' });
		return state;
	},
	[requestSuccess](state) {
		destoryLoadingFunc();
		return state;
	},
	[openRoot]: (state, { payload, }) => {
		return {
			...state,
			activeCarrier: 'home',
		};
	},
	[showTabs]: (state, { payload, }) => {
		return {
			...state,
			activeCarrier: payload.id,
		};
	},
	[getAllMenuList]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			allMenuList: payload,
		};
	},
	[getHistoryList]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			historyList: payload,
		};
	},
	[changeRetract]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			retract: !payload,
		};
	},
	[setMenuKeys]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		const { menuItemCodes } = state;
		return {
			...state,
			menuKeys: payload.menuKeys,  // 设定菜单那里选中的keys
			menuItemCodes: payload.menuItemCodes || menuItemCodes,
		};
	},
}, defaultState);

export default function (state, action) {
	const rootState = reducer(state, action);
	const pageState = {
		// 可以加载多个redux
	};
	const store = Object.assign({}, rootState, pageState);
	return store;
}
