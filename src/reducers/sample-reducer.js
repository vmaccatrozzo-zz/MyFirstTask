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
			let newData = Object.assign({}, state.data)
			newData[action.provenance][action.property].list[action.id].selected  = !state.data[action.provenance][action.property].list[action.id].selected 
			return {
				...state,
				data: newData};

		case "EXPAND_ROWS":
			newData = Object.assign({}, state.data)
			newData[action.provenance][action.property].isExpanded  = !state.data[action.provenance][action.property].isExpanded 
			newData[action.provenance][action.property].list[0].selected  = !newData[action.provenance][action.property].list[0].selected
			return {
				...state,
				data: newData};

		case "INCLUDE_NEW_SOURCE":
			var OldSameAs = Object.assign({}, state.data);
			var NewSameAs = action.data['Other sources']['sameas'].list
			for(var i=0;i<NewSameAs.length;i++){
				OldSameAs['Other sources']['sameas'].list.push(NewSameAs[i])
			}
			
			var mergedData = Object.assign({}, state.data, action.data, OldSameAs)
			return {
				...state,
				data: mergedData
			};
		case "UPLOAD":
			var triples2load = new Map;
			newData = Object.assign({}, state.data);
			for(var key in newData){
				for(var key2 in newData[key]){
					var object_list = newData[key][key2].list
					for(var i =0; i<object_list.length; i++){
						if(object_list[i].selected == true){
							if(Object.keys(triples2load).indexOf(object_list[i].subject_uri) ==-1){
								triples2load[object_list[i].subject_uri] = new Map
							}
							if(Object.keys(triples2load[object_list[i].subject_uri]).indexOf(object_list[i].property_uri) ==-1){
								triples2load[object_list[i].subject_uri][object_list[i].property_uri] = new Array
							}
							triples2load[object_list[i].subject_uri][object_list[i].property_uri].push(object_list[i].object_uri)
						}
					}
				}
			}
			var jsonLDMAP = '['
			var subjects = Object.keys(triples2load)
			for (var keySub in triples2load){
			 	jsonLDMAP += '{"@id":"' +  keySub +'"'
				if(subjects.length >1){
					jsonLDMAP += ',"http://www.w3.org/2002/07/owl#sameAs":['
					var index = subjects.indexOf(keySub)
					subjects.splice(index, 1)
					for (var s = 0 ; s < subjects.length; s++){
						if (keySub!=subjects[s]){
							jsonLDMAP += '"' +subjects[s] +'"'
							if (s<subjects.length-1){
								jsonLDMAP += ','
							}
						}
					}
					jsonLDMAP += ']'
				}
				
				for (var keyProp in triples2load[keySub]){
					jsonLDMAP += ',"'+ keyProp +'":['
					for (var o =0; o  < triples2load[keySub][keyProp].length ; o++){
						jsonLDMAP += '"'+triples2load[keySub][keyProp][o] +'"'
						if (o != triples2load[keySub][keyProp].length-1){
							jsonLDMAP +=","
						}else{
							jsonLDMAP +="]"
						}
					}
				}
				jsonLDMAP +="},"
			}
			jsonLDMAP = jsonLDMAP.substring(0, jsonLDMAP.length - 1) + "]"
			console.log(jsonLDMAP)	 
	}

	return state;
}