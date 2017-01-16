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
			if([action.property]!='sameas'){
				newData[action.provenance][action.property].list[action.id].selected  = !state.data[action.provenance][action.property].list[action.id].selected 
				return {
					...state,
					data: newData};
			}

		case "EXPAND_ROWS":
			newData = Object.assign({}, state.data)
			if([action.property]!='sameas'){
			newData[action.provenance][action.property].isExpanded  = !state.data[action.provenance][action.property].isExpanded 
			newData[action.provenance][action.property].list[0].selected  = !newData[action.provenance][action.property].list[0].selected
			return {
				...state,
				data: newData};}

		case "INCLUDE_NEW_SOURCE":
			if(typeof(action.data)!= 'undefined'){
				var uploadedSources = action.uploaded;
				var OldSameAs = Object.assign({}, state.data);
				var keys = Object.keys(OldSameAs['Other sources']['sameas'])
				for(var i=0; i< uploadedSources.length; i++){
					if(uploadedSources[i].indexOf('http://')==0){
						uploadedSources[i] = uploadedSources[i].split('http://')[1]
					}
					if(uploadedSources[i].indexOf('www.')==0){
						uploadedSources[i] = uploadedSources[i].split('www.')[1]
					}
				}
				for(var k = 0; k<keys.length; k++){
					var dataList = OldSameAs['Other sources']['sameas'][keys[k]]
					for(var d = 0; d < dataList.length; d++){
						if(OldSameAs['Other sources']['sameas'][keys[k]][d].object.indexOf('http://')==0){
							OldSameAs['Other sources']['sameas'][keys[k]][d].object = OldSameAs['Other sources']['sameas'][keys[k]][d].object.split('http://')[1]
						}
						if(OldSameAs['Other sources']['sameas'][keys[k]][d].object.indexOf('www.')==0){
							OldSameAs['Other sources']['sameas'][keys[k]][d].object = OldSameAs['Other sources']['sameas'][keys[k]][d].object.split('www.')[1]
						}
					}
				}
			
			
				var NewSameAs = action.data['Other sources']['sameas'].list
				for(var i = 0; i < NewSameAs.length; i++){
					var flag = false
					for(var ii = 0; ii < OldSameAs['Other sources']['sameas'].list.length; ii++){
						if(NewSameAs[i].object.indexOf('http://')==0){
							NewSameAs[i].object = NewSameAs[i].object.split('http://')[1]
						}
						if(NewSameAs[i].object.indexOf('www.')==0){
							NewSameAs[i].object = NewSameAs[i].object.split('www.')[1]
						}
						if(OldSameAs['Other sources']['sameas'].list[ii].object == NewSameAs[i].object){
							OldSameAs['Other sources']['sameas'].list[ii].provenance += ', ' + NewSameAs[i].provenance
							flag = true
							break
						}
					}
					if(flag==false){
						OldSameAs['Other sources']['sameas'].list.push(NewSameAs[i])
					}
				}
				
				
				for(var k = 0; k<keys.length; k++){
					var dataList = OldSameAs['Other sources']['sameas'][keys[k]]
					for(var d = 0; d < dataList.length; d++){
						if(uploadedSources.indexOf(OldSameAs['Other sources']['sameas'][keys[k]][d].object)!=-1){
							OldSameAs['Other sources']['sameas'][keys[k]].splice(d, 1)
						}		
					}
				}
				var mergedData = Object.assign({}, state.data, action.data, OldSameAs)
				
				return {
					...state,
					data: mergedData
				}
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
			if(jsonLDMAP[jsonLDMAP.length-1]==','){
				jsonLDMAP = jsonLDMAP.substring(0, jsonLDMAP.length - 1) + "]"
			}else{
				jsonLDMAP += "]"
			}

			console.log(jsonLDMAP)	 
	}

	return state;
}