import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import sampleReducer from  "./sample-reducer";

const reducers = {
	sample: sampleReducer
};

export default createStore(
	combineReducers(reducers),
	applyMiddleware(thunkMiddleware)
);