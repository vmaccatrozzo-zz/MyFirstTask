import React from "react";
import { Router, Route, hashHistory} from "react-router";
import { Provider, connect } from "react-redux";
import actions from "./actions/actions";
import App from "./components/app";
import store from "./reducers/store";
import PropValue from './components/PropValue';
import PropValueList from './components/PropertyValueList';

var urls = {
	root() {
		return "/";
	}
};

export function navigateTo(key, args) {
	hashHistory.push(urls[key].apply(null, args));
}

function makeViewModel(state) {
	return {
 		data: state.sample.data,
		uploadDatajs: state.sample.uploadDatajs,
		propertyList: state.sample.propertyList
	}
}

const connectComponent = connect(makeViewModel, (dispatch) => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path={urls.root()} component={connectComponent(App)} />
		</Router>
	</Provider>
);

export default router;