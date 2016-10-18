import React, { PropTypes } from 'react'

const PropValue = ({onClick, subject_uri, property, object, provenance, selected , property_uri, object_uri}) => (
  	
	<div className="row" id="triple" title ={selected} onClick={onClick} style={{backgroundColor: selected ? 'yellow' : 'white'}}>
		<div id='subject_uri' title={subject_uri} ></div>
		<div className="col-md-4" ><a href={property_uri} title={property_uri} > {property} </a></div>
		<div id='property_uri' title={property_uri} ></div>
		<div className="col-md-4"  ><a href={object_uri} title={object_uri}> {object} </a></div>
		<div id='object_uri' title={object_uri} ></div>
		<div className="col-md-4"> {provenance} </div>
	</div>
)

PropValue.propTypes = {
    onCLick: PropTypes.func,
	object: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
}

export default PropValue
