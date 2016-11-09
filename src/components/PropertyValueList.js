import React, { PropTypes } from 'react'
import PropValueIntermezzo from './PropValueIntermezzo'

const PropValueList = ({ propValues , onValueClick, expandClick}) => {
	return(
	
	<div className='container-fluid' id='form-result'>
		<div className="row-fluid" >
			<div className='col-md-4'>Property</div>
			<div className='col-md-4'>Object</div>
			<div className='col-md-3'>Provenance</div>
			<div className='col-md-1'></div>
		</div>		
			
		{Object.values(propValues).map ((propValue, idx) => 
			(<PropValueIntermezzo 
				key = {idx}
				propertyList = {propValue.list}
				isExpanded = {propValue.isExpanded}
				onValueClick = {onValueClick}
				expandClick = {expandClick}
			/>)
		)}
	</div>	
	
)};
	
// PropValueList.propTypes={
// 	propValues:PropTypes.objectOf(PropTypes.shape({
// 	onCLick: PropTypes.func,
// 	object: PropTypes.string.isRequired,
// 	property: PropTypes.string.isRequired,
// 	provenance: PropTypes.string.isRequired,
// 	selected: PropTypes.bool.isRequired
// 	}).isRequired).isRequired
// }

export default PropValueList