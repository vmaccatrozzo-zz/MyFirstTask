const properties2skip =['http://schema.org/sameAs','http://www.w3.org/2000/01/rdf-schema#comment','http://purl.org/dc/terms/identifier']
const ontologies = ['http://downloads.dbpedia.org/2016-04/dbpedia_2016-04.owl','http://dublincore.org/2012/06/14/dcterms.ttl','http://xmlns.com/foaf/spec/index.rdf','http://www.w3.org/2000/01/rdf-schema.rdf','http://www.w3.org/1999/02/22-rdf-syntax-ns.rdf','https://www.w3.org/2009/08/skos-reference/skos.rdf','https://www.w3.org/ns/prov-o.owl','http://www.w3.org/2002/07/owl.ttl']
			
const $rdf = require('rdflib');
const store = $rdf.graph()
const timeout = 5000 // 5000 ms timeout
const fetcher = new $rdf.Fetcher(store, timeout)


function pushTriple(triples_array, object, provenance,property_uri,subject_uri,propertiesLabels){
		
			var propertyLabel = getPropertyLabel(property_uri,propertiesLabels)
			if(Object.keys(triples_array).indexOf(propertyLabel)==-1){
				triples_array[propertyLabel] = new Map;
				triples_array[propertyLabel]= {list: new Array(), isExpanded: false}
			}
			var row = {property: propertyLabel, object: object, provenance: provenance, selected: false, property_uri:property_uri, object_uri: object, subject_uri: subject_uri}
			triples_array[propertyLabel].list.push(row) 
			return triples_array
		}

function getPropertyLabel(property,propertiesLabels){
	if((typeof (propertiesLabels)) =='undefined'){
		var parts = property.split('/');
			if (parts[parts.length-1].indexOf('#') != -1){
				parts = parts[parts.length-1].split('#')
			}
		var label = parts[parts.length-1]
	}else{	
		if(typeof (propertiesLabels[property]) =='undefined'){
			var parts = property.split('/');
			if (parts[parts.length-1].indexOf('#') != -1){
				parts = parts[parts.length-1].split('#')
			}
			var label = parts[parts.length-1]
		}else{
			var label = propertiesLabels[property]	
			// console.log(label)
		}
	}
	return label
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
		if(typeof array2sort[i].lang !='undefined'){
			if(array2sort[i].lang.indexOf('en')==0){
				if(result.indexOf(array2sort[i].value)== -1){
					result.push(array2sort[i].value)
				}
			}
		}else{
			if(result.indexOf(array2sort[i].value)== -1){
				result.push(array2sort[i].value)
			}
		}
	}
	return result
}

function test_fetcher(){
	var url ='https://www.wikidata.org/wiki/Q1067'
	fetcher.nowOrWhenFetched(url, function(ok, body, xhr) {
		if (!ok) {
			console.log("Oops, something happened and couldn't fetch data");
		} else {
			var data = store.statementsMatching($rdf.sym(url),undefined,undefined)
			for(var t=0;t<data.length;t++){
				console.log(data[t].subject.value)
				console.log(data[t].object.value)
			}
		}
	})
}
function getData(subject, property, objects, prov, primary_data,propertyLabels){	
	if (properties2skip.indexOf(property) ==-1 & property.indexOf('http://www.iana.org')!=0){
		var unique_objects = uniqueArrayObjects(objects)
		for(var i=0; i<unique_objects.length; i++){
			var object = unique_objects[i]
			primary_data = pushTriple(primary_data, object, prov, property, subject,propertyLabels)
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
			
			var primary_data = new Array();
			var propertiesLabels = new Map();
			// test_fetcher()
			fetcher.nowOrWhenFetched(ontologies[0], function(ok, body, xhr) {
				if (!ok) {
					console.log("Oops, something happened and couldn't fetch data");
				} else {
					fetcher.nowOrWhenFetched(ontologies[1], function(ok, body, xhr) {
						if (!ok) {
							console.log("Oops, something happened and couldn't fetch data");
						} else {
							fetcher.nowOrWhenFetched(ontologies[2], function(ok, body, xhr) {
								if (!ok) {
									console.log("Oops, something happened and couldn't fetch data");
								} else {
									fetcher.nowOrWhenFetched(ontologies[3], function(ok, body, xhr) {
										if (!ok) {
											console.log("Oops, something happened and couldn't fetch data");
										} else {
											fetcher.nowOrWhenFetched(ontologies[4], function(ok, body, xhr) {
												if (!ok) {
													console.log("Oops, something happened and couldn't fetch data");
												} else {
													fetcher.nowOrWhenFetched(ontologies[5], function(ok, body, xhr) {
														if (!ok) {
															console.log("Oops, something happened and couldn't fetch data");
														} else {
															fetcher.nowOrWhenFetched(ontologies[6], function(ok, body, xhr) {
																if (!ok) {
																	console.log("Oops, something happened and couldn't fetch data");
																} else {
																	fetcher.nowOrWhenFetched(ontologies[7], function(ok, body, xhr) {
																		if (!ok) {
																			console.log("Oops, something happened and couldn't fetch data");
																		} else {
																			fetcher.nowOrWhenFetched(url_complete, function(ok, body, xhr) {
																				if (!ok) {
																					console.log("Oops, something happened and couldn't fetch data");
																				} else {
																					var labels_data = store.statementsMatching(undefined,$rdf.sym('http://www.w3.org/2000/01/rdf-schema#label'),undefined)																
																					for(var i = 0; i<labels_data.length; i++){
																						if(labels_data[i].object.lang){
																							if(labels_data[i].object.lang == 'en'){
																								var sub = labels_data[i].subject.value
																								var obj = labels_data[i].object.value
																								propertiesLabels[sub] = obj
																							}
																						}else{
																							var sub = labels_data[i].subject.value
																							var obj = labels_data[i].object.value
																							propertiesLabels[sub] = obj
																						}
																					}	
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
																						primary_data = getData(url,prop,objects,'Viaf',primary_data,propertiesLabels)
																						
																					}
																					fetcher.nowOrWhenFetched(Dbpedia_sameAs, function(ok, body, xhr) {
																						if (!ok) {
																							console.log("Oops, something happened and couldn't fetch data");
																						} else {
																							var s = $rdf.sym(Dbpedia_sameAs)
																							var unique_prop = store.each(s, undefined)
																							
																							for(var i=0; i<unique_prop.length; i++){     

																								var prop = unique_prop[i].value;
																								console.log(prop)
																								var objects = store.each(s,$rdf.sym(prop),undefined);
																								primary_data = getData(Dbpedia_sameAs,prop,objects,'DBpedia',primary_data,propertiesLabels)	
																							}
																							dispatch({type: "RECEIVE_URL", 
																									data: primary_data
																							})
																						}
																					})
																				}
																			})
																		}
																	})
																}
															})
														}
													})
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
		},
		
		onValueClick: function (property,id) {
		  	dispatch({type: "SELECT_VALUE", 
			  		 property: property,
					 id: id})
		},

		
		expandClick: function (property){
			dispatch({type: "EXPAND_ROWS",
					property: property,})
		},

		uploadData: function(){
			var t = 0
			var triples2load = new Array();
			var data = document.getElementsByClassName('row fluid')
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
			console.log(triples2load)
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
					// console.log(keyProp)
					jsonLDMAP += ',"'+ keyProp +'":['
					for (var o =0; o  < triples2load[keySub][keyProp].length ; o++){
						// console.log(triples2load[keySub][keyProp][o])
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

