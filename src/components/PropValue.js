import React, { PropTypes } from 'react'

const PropValue = ({onClick, subject_uri, property, object, provenance, selected, property_uri, object_uri, onButtonClick,target, hasExpandButton}) => { 
	
	// console.log(selected)
	return(
  		
		<div className={"row"}  title ={selected}>
			<div id="subject_uri" title={subject_uri} style={{display : "none"}}></div>
			<div className="col-md-4" id="property_uri" title={property_uri} > {property} </div>
			<div className='col-md-4'  onClick={onClick} title={object_uri} style={{backgroundColor: selected ? 'grey' : 'white'}}> {object} </div>
			<div className='col-md-3'> {provenance} </div>
			<div className="col-md-1">
				{hasExpandButton ? <button type="button" onClick={onButtonClick} className="btn btn-primary" data-toggle="collapse" data-target={target}><i className="glyphicon glyphicon-plus"></i></button> : '' }
			</div>
		</div>
)}

// PropValue.propTypes = {
//     onCLick: PropTypes.func,
// 	object: PropTypes.string.isRequired,
// 	property: PropTypes.string.isRequired,
// 	provenance: PropTypes.string.isRequired,
// 	selected: PropTypes.bool.isRequired
// }

export default PropValue
