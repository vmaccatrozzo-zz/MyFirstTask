function pushTriple(triples_array, id, property, object, provenance,property_uri, object_uri,subject_uri){
			triples_array[id] = new Array;
			triples_array[id].push(property) ;
			triples_array[id].push(object) ;
			triples_array[id].push(provenance);
			triples_array[id].push(false);
			triples_array[id].push(property_uri);
			triples_array[id].push(object_uri);
			triples_array[id].push(subject_uri);
			return triples_array
		}
function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k,v] of strMap) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            obj[k] = v;
        }
        return obj;
    }

export default function (navigateTo, dispatch) {
	return {
		
		onSampleClick: function(url_complete) {
			var url = document.getElementById('input_url').value;
			var url_complete = '';
			var id = 0;
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
			var primary_data = new Array;
			var timeout = 5000 // 5000 ms timeout
			var fetcher = new $rdf.Fetcher(store, timeout)
			
			fetcher.nowOrWhenFetched(url_complete, function(ok, body, xhr) {
				if (!ok) {
					console.log("Oops, something happened and couldn't fetch data");
				} else {
					var s = $rdf.sym(url),
					prop = store.each(s, undefined),
					unique_prop = [];
			
					var sameAs_prop = $rdf.sym("http://schema.org/sameAs");
					var sameASes = store.each(s,sameAs_prop,undefined);
					for (var i=0; i<sameASes.length; i++){
						var temp = sameASes[i].value;
						if (temp.indexOf('http://dbpedia.org/resource/')==0){
							var Dbpedia_sameAs = temp;
						}
					}
					for(var i=0; i<prop.length; i++){
						var pro = prop[i];
						if (unique_prop.indexOf(pro.value)==-1){
							unique_prop.push(pro.value);
						}
					}
					for(var i=0; i<unique_prop.length; i++){       	
						var prop = unique_prop[i];
						var objects = store.each(s,$rdf.sym(prop),undefined);
						var unique_objects=[]
						for(var ii=0; ii<objects.length; ii++){
							var object = objects[ii];
							var object_parts = 	object.value.split("/");
							var parts = prop.split('/');
							if (parts[parts.length-1].indexOf('#') != -1){
								parts = parts[parts.length-1].split('#')
							}
							if (!(prop =="http://schema.org/sameAs" |prop == 'http://www.w3.org/2000/01/rdf-schema#comment' |prop=='http://purl.org/dc/terms/identifier')){
								if (object.lang){
									if (object.lang=='en'){
										if(unique_objects.indexOf(object.value)==-1){
											unique_objects.push(object.value)
											primary_data = pushTriple(primary_data,id,parts[parts.length-1],object_parts[object_parts.length-1],'viaf',prop,object.value,url)
											id ++
										}
									}	
								}else{
									if(unique_objects.indexOf(object.value)==-1){
										unique_objects.push(object.value)
										primary_data = pushTriple(primary_data,id,parts[parts.length-1],object_parts[object_parts.length-1],'viaf',prop, object.value,url)
										id ++
									}
								}
							}	
						}
					}
					
					fetcher.nowOrWhenFetched(Dbpedia_sameAs, function(ok, body, xhr) {
						if (!ok) {
							console.log("Oops, something happened and couldn't fetch data");
						} else {
							var s = $rdf.sym(Dbpedia_sameAs),
							prop = store.each(s, undefined),
							unique_prop = [];
							for(var i=0; i<prop.length; i++){
								var pro = prop[i];
								if (unique_prop.indexOf(pro.value)==-1){
									unique_prop.push(pro.value);
								}
							}
						}
						for(var i=0; i<unique_prop.length; i++){       	
							var prop = unique_prop[i];
							var objects = store.each(s,$rdf.sym(prop),undefined);
							var unique_objects=[]
							for(var ii=0; ii<objects.length; ii++){
				
								var object = objects[ii];
								
								if(unique_objects.indexOf(object.value)==-1) {
									unique_objects.push(object.value);
									var parts = prop.split('/');
									if (parts[parts.length-1].indexOf('#') != -1){
										var parts = parts[parts.length-1].split('#')
										}
									var object_parts = 	object.value.split("/");
									if 	(! object.lang){
										primary_data = pushTriple(primary_data,id,parts[parts.length-1],object_parts[object_parts.length-1],'dbpedia',prop,object.value,Dbpedia_sameAs)
										id++
									}else if(object.lang =='en'){
										primary_data = pushTriple(primary_data,id,parts[parts.length-1],object_parts[object_parts.length-1],'dbpedia',prop,object.value,Dbpedia_sameAs)
										id++
									}
								}	
							}
						}
						dispatch({type: "RECEIVE_URL", 
								  data: primary_data
						})
					})	
				}
			});

		},
		
		onValueClick: function(id) {
		  	dispatch({type: "SELECT_VALUE", 
					 key: id})
		},

		uploadData: function(){
			var t = 0
			var triples2load = new Array;
			var data = document.getElementById('form-result').children
			for (var i = 1; i<data.length; i++){
				if(data[i].getAttribute('title')=='true'){
					var child = data[i].children
					var subjectURI = child[0].getAttribute('title')
					var propertyURI = child[4].getAttribute('title')
					var objectURI = child[2].getAttribute('title')
					if (Object.keys(triples2load).indexOf(subjectURI)==-1){
						triples2load[subjectURI] = new Map()
					}
					if (Object.keys(triples2load[subjectURI]).indexOf(propertyURI)==-1){
						triples2load[subjectURI][propertyURI] = new Array
					}
					triples2load[subjectURI][propertyURI].push(objectURI)
				}
			}	
			var jsonLDMAP = '['
			for (var keySub in triples2load){
				jsonLDMAP += '{"@id":"' +  keySub +'"'
				
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

