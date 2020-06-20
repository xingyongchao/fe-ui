import { createActions } from '@u';
import types from './types';
import {
	getAllMenuList,
	getHistoryList,
} from './api';
const {
	REQUEST_START,
	REQUEST_SUCCESS,
	OPEN_ROOT,
	SHOW_TABS,
	GET_ALL_MENU_LIST,
	GET_HISTORY_LIST,
	CHANGE_RETRACT,
	SET_MENU_KEYS,
} = types;

export default createActions(
	{
		[GET_ALL_MENU_LIST]: getAllMenuList,
		[GET_HISTORY_LIST]: getHistoryList,
	},
	OPEN_ROOT,
	SHOW_TABS,
	CHANGE_RETRACT,
	SET_MENU_KEYS,
	REQUEST_START,
	REQUEST_SUCCESS,
);
