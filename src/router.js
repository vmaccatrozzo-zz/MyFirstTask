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
	var myTableRows = [];
 	for (var key in state.sample.data){
 		 var item = state.sample.data[key];
 		 var row = {key:key, property: item[0], value: item[1], provenance: item[2], selected: item[3]}
 		 myTableRows.push(row)
 	}
	return {
 		myTableRows: myTableRows
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