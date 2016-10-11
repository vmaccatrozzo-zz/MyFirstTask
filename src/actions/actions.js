// export const selectValue = (id) => {
//   return {
//     type: 'SELECT_VALUE',
//     id
//   }
// }


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
							if (!(prop == 'http://schema.org/name' | prop =="http://schema.org/sameAs" |prop == 'http://www.w3.org/2000/01/rdf-schema#comment' |prop=='http://purl.org/dc/terms/identifier')){
								if(unique_objects.indexOf(object.value)==-1) {
									unique_objects.push(object.value)
								var parts = prop.split('/');
									if (parts[parts.length-1].indexOf('#') != -1){
										var parts = parts[parts.length-1].split('#')
										}
					// var item = new PropValue(id,parts[parts.length-1],object.value,'viaf',false);
// 									
// 									primary_data.push(item);
									if 	(! object.lang){
										primary_data[id] = new Array;
										
										primary_data[id].push(parts[parts.length-1]) ;
										primary_data[id].push(object.value) ;
										primary_data[id].push('viaf');
										primary_data[id].push(false);
										id ++
									}else if(object.lang =='en'){
										primary_data[id] = new Array;
										
										primary_data[id].push(parts[parts.length-1]) ;
										primary_data[id].push(object.value) ;
										primary_data[id].push('viaf');
										primary_data[id].push(false);
										id ++
									}
								}	
							}
							if (prop == 'http://schema.org/name' && object.lang =='en'){
								var name = object.value;
							}
						}
					}
					primary_data[id]= new Array;
					
					primary_data[id].push('name')
					primary_data[id].push(name);	
					primary_data[id].push('viaf');
					primary_data[id].push(false);
					// item = new PropValue([id,'name',name,'viaf',false]);
// 					primary_data.push(item);
					id++;
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
									primary_data[id] = new Array;
									
									primary_data[id].push('dbpedia_'+parts[parts.length-1]) ;
									primary_data[id].push(object.value) ;
									primary_data[id].push('dbpedia');
									primary_data[id].push(false);
									// item = new PropValue(id,'dbpedia_'+parts[parts.length-1],object.value,'dbpedia',false);
// 									
// 									primary_data.push(item);
									id++;
								}	
								
						
								if (prop == 'http://dbpedia.org/ontology/abstract' && object.lang =='en'){
									var abs = object.value;
								}
							}
						}
						primary_data[id]= new Array;
						
						primary_data[id].push('dbpedia_abstract')
						primary_data[id].push(abs);	
						primary_data[id].push('dbpedia');
						primary_data[id].push(false);
						// item = new PropValue(id,'dbpedia_abstract',abs,'dbpedia',false]);
// 						primary_data.push(item);
						id++;
// 						var res = new PropValueList(primary_data);
// 						console.log(primary_data);
						dispatch({type: "RECEIVE_URL", 
								  data: primary_data
						//			navigateTo("root")
						})
					})	
				}
			});

		}
	}
};
