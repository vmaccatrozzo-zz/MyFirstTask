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

		case "NO_DATA":
		return{
			...state,
			data: action.data
		}
			
		case "SELECT_VALUE":
			// debugger;
			
			let newData = Object.assign({}, state.data);
			// let property = Object.assign({},state.data[action.property])
			// let list = Object.assign({},state.data[action.property].list)
			// let item = Object.assign({}, state.data[action.property].list[action.id])
			newData[action.provenance][action.property].list[action.id].selected  = !state.data[action.provenance][action.property].list[action.id].selected 
			return {
				...state,
				data: newData};

		case "EXPAND_ROWS":
			newData = Object.assign({}, state.data);
			newData[action.provenance][action.property].isExpanded  = !state.data[action.provenance][action.property].isExpanded 
			return {
				...state,
				data: newData};

		case "INCLUDE_NEW_SOURCE":
			
			var mergedData = Object.assign({},state.data, action.data)
			return {
				...state,
				data: mergedData
			};
	}

	return state;
}