import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import 'assets/style/base.css';
import 'assets/style/animate.css';
import 'assets/style/iuapmobile.um.css';
import Wrap from 'pages/wrap';

const App = () => (
	<Provider store={store} >
			<Wrap />
	</Provider>
);


window.React = React;
window.ReactDOM = ReactDOM;
const rootElm = document.getElementById('root');
ReactDOM.render(<App />, rootElm);
