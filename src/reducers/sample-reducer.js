import PropValueList from '../components/PropertyValueList';

const initialState = {
	myTableRows: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		
		case "RECEIVE_URL":
			return {
				...state,
				data: action.data
			};
			
		case "SELECT_VALUE":
			let newData = Object.assign({}, state.data);
			newData[action.property].list[action.id].selected  = !state.data[action.property].list[action.id].selected 
			return {
				...state,
				data: newData};

		case "EXPAND_ROWS":
			newData = Object.assign({}, state.data);
			newData[action.property].isExpanded  = !state.data[action.property].isExpanded 
			return {
				...state,
				data: newData};
	}

	return state;
}