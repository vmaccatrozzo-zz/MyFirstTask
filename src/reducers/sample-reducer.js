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
			
			console.log(action) 

			let newState = Object.assign({}, state);
				
			newState.data[action.property].list =  Object.assign({}, state.data[action.property].list);
			console.log(newState.data[action.property].list[action.id].selected)
			newState.data[action.property].list[action.id].selected  = !state.data[action.property].list[action.id].selected 
			// newState.data[action.property].list = Array.from(state.data[action.property].list)
			// 	.map((entry, idx) => {
			// 		if (idx === action.id) {
						
			// 			Object.assign({}, entry, {selected: !state.data[action.property].list[action.id].selected });
			// 		} 
			// 	})
			console.log(newState.data[action.property].list[action.id].selected)

			return newState;
		  	
		case "EXPAND_ROWS":
			var x = Object.assign({}, state, {
				data: state.data.slice(0, action.target)
				.concat([[state.data[action.property].list[action.id][0], state.data[action.property].list[action.id][1], state.data[action.property].list[2], state.data[action.property].list[3],state.data[action.property].list[4], state.data[action.property].list[5], state.data[action.property].list[6],state.data[action.property].list[7]='row-fluid collapse in',state.data[action.property].list[8],state.data[action.property].list[9],state.data[action.property].list[10],state.data[action.property].list[11],state.data[action.property].list[12]]])
				.concat(state.data.slice((action.key*1)+1))
		  	});
		  	return x;
	}

	return state;
}