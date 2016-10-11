import PropValueList from '../components/PropertyValueList';

const initialState = {
	
	another: "x"
};

export default function(state=initialState, action) {
	
	switch (action.type) {
		
		case "RECEIVE_URL":
// 			console.log(typeof action.data);
			return {
				...state,
				data: action.data
			};
		case "SELECT_VALUE":
		  if (state.id !== action.id) {
			return state
		  }

		  return Object.assign({}, state, {
			selected: !state.selected
		  });
		
	}

	return state;
}