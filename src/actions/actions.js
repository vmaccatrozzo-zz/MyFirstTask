const properties2skip =['http://schema.org/sameAs','http://www.w3.org/2000/01/rdf-schema#comment','http://purl.org/dc/terms/identifier']

function pushTriple(triples_array, object, provenance,property_uri,subject_uri){
			var propertyLabel = getPropertyLabel(property_uri);
			if(Object.keys(triples_array).indexOf(propertyLabel)==-1){
				triples_array[propertyLabel] = new Map;
				triples_array[propertyLabel]= {list: new Array(), isExpanded: false}
			}
			var row = {property: propertyLabel, object: object, provenance: provenance, selected: false, property_uri:property_uri, object_uri: object, subject_uri: subject_uri}
			triples_array[propertyLabel].list.push(row) 
			return triples_array
		}

function getPropertyLabel(property){
	var parts = property.split('/');
	if (parts[parts.length-1].indexOf('#') != -1){
		parts = parts[parts.length-1].split('#')
	}
	return parts[parts.length-1]
}

function uniqueArray(inputArray){
	var outputArray = new Array()
	for(var i=0; i<inputArray.length; i++){
		var pro = inputArray[i];
		if (outputArray.indexOf(pro.value)==-1){
			outputArray.push(pro.value);
		}
	}
	return outputArray
}

function uniqueArrayObjects(array2sort){
	var result = new Array()
	for(var i = 0; i < array2sort.length; i++){
		
		// if(array2sort[i].lang){
		// 	if(array2sort[i].lang == 'en' & result.indexOf(array2sort[i].value == -1)){
		// 		result.push(array2sort[i].value)
		// 	}

		// }else{
		
		if(result.indexOf(array2sort[i].value)== -1){
			result.push(array2sort[i].value)
		}
		// }
	}
	
	return result
}
function getData(subject, property, objects, prov, primary_data){
	if (properties2skip.indexOf(property) ==-1){
		var unique_objects = uniqueArrayObjects(objects)
		for(var i=0; i<unique_objects.length; i++){
			var object = unique_objects[i]
			primary_data = pushTriple(primary_data, object, prov, property, subject)
		}
	}
	return(primary_data)
};

export default function (navigateTo, dispatch) {
	return {
		
		onSampleClick: function(url_complete) {
			var url = document.getElementById('input_url').value;
			var url_complete = '';
			if (url.indexOf('http://viaf')==0){
				url_complete = url+'/rdf.xml';
			}else{
				url_complete = url.data;
			};
			
			var $rdf = require('rdflib');
			var RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#")
			var OWL = $rdf.Namespace("http://www.w3.org/2002/07/owl#")
			var SCHEMA = $rdf.Namespace("http://schema.org/")
			var store = $rdf.graph()
			var primary_data = new Array();
			var timeout = 5000 // 5000 ms timeout
			var fetcher = new $rdf.Fetcher(store, timeout)

			fetcher.nowOrWhenFetched(url_complete, function(ok, body, xhr) {
				if (!ok) {
					console.log("Oops, something happened and couldn't fetch data");
				} else {
					var s = $rdf.sym(url),
					prop = store.each(s, undefined);
			
					var sameAs_prop = $rdf.sym("http://schema.org/sameAs");
					var sameASes = store.each(s,sameAs_prop,undefined);
					for (var i=0; i<sameASes.length; i++){
						var temp = sameASes[i].value;
						if (temp.indexOf('http://dbpedia.org/resource/')==0){
							var Dbpedia_sameAs = temp;
						}
					}

					var unique_prop = uniqueArray(prop)
					
					for(var i=0; i<unique_prop.length; i++){       	
						var prop = unique_prop[i];
						var objects = store.each(s,$rdf.sym(prop),undefined);

						primary_data = getData(url,prop,objects,'viaf',primary_data,)
						
					}
					
					fetcher.nowOrWhenFetched(Dbpedia_sameAs, function(ok, body, xhr) {
						if (!ok) {
							console.log("Oops, something happened and couldn't fetch data");
						} else {
							var s = $rdf.sym(Dbpedia_sameAs),
							prop = store.each(s, undefined),
							unique_prop = uniqueArray(prop);
						
							for(var i=0; i<unique_prop.length; i++){       	
								var prop = unique_prop[i];
								var objects = store.each(s,$rdf.sym(prop),undefined);
								primary_data = getData(Dbpedia_sameAs,prop,objects,'dbpedia',primary_data)	
							}
							// console.log(primary_data['type'].list)
							dispatch({type: "RECEIVE_URL", 
									data: primary_data
							})
						}
					})
				}
			});

		},
		
		onValueClick: function (property,id) {
		  	dispatch({type: "SELECT_VALUE", 
			  		 property: property,
					 id: id})
		},

		
		expandClick: function (target){
			var toReturn = target.substr(1);
			dispatch({type: "EXPAND_ROWS",
					key: toReturn})
		},
		uploadData: function(){
			var t = 0
			var triples2load = new Array();
			var data = document.getElementById('form-result').children
			for (var i = 1; i<data.length; i++){
				if(data[i].getAttribute('title')=='true'){
					var child = data[i].children
					var subjectURI = child[0].getAttribute('title')
					var propertyURI = child[1].getAttribute('title')
					var objectURI = child[2].getAttribute('title')
					if (Object.keys(triples2load).indexOf(subjectURI)==-1){
						triples2load[subjectURI] = new Map()
					}
					if (Object.keys(triples2load[subjectURI]).indexOf(propertyURI)==-1){
						triples2load[subjectURI][propertyURI] = new Array()
					}
					triples2load[subjectURI][propertyURI].push(objectURI)
				}
			}	
			var jsonLDMAP = '['
			var subjects = Object.keys(triples2load)
			for (var keySub in triples2load){
				jsonLDMAP += '{"@id":"' +  keySub +'"'
				 if(subjects.length >1){
					jsonLDMAP += ',"http://www.w3.org/2002/07/owl#sameAs":['
					var index = subjects.indexOf(keySub);
					subjects.splice(index, 1);
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
					console.log(keyProp)
					jsonLDMAP += ',"'+ keyProp +'":['
					for (var o =0; o  < triples2load[keySub][keyProp].length ; o++){
						console.log(triples2load[keySub][keyProp][o])
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
			jsonLDMAP = jsonLDMAP.substring(0, jsonLDMAP.length - 1) + ']'
			console.log(jsonLDMAP)
		}
  	}
};

