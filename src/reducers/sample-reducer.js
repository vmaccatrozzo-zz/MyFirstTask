import PropValueList from '../components/PropertyValueList';

const initialState = {
	
	another: "x"
};

export default function(state=initialState, action) {
	switch (action.type) {
		
		case "RECEIVE_URL":
			return {
				...state,
				
				data: action.data
			};
			
		case "SELECT_VALUE":
		  	var x = Object.assign({}, state, {
				data: state.data.slice(0, action.key)
				.concat([[state.data[action.key][0], state.data[action.key][1], state.data[action.key][2], !state.data[action.key][3],state.data[action.key][5], state.data[action.key][4], state.data[action.key][6]]])
				.concat(state.data.slice((action.key*1)+1))
		  	});
		  	return x;
	}

	return state;
}