import React, { PropTypes } from 'react'
import PropValue from './PropValue'

const PropValueList = ({ propValues , onValueClick}) => {return(
	
	<div className="container-fluid" id='form-result'>
		<div className="row">
				<div className="col-md-4"><h2>Property</h2></div>
				<div className="col-md-4"><h2>Object</h2></div>
				<div className="col-md-4"><h2>Provenance</h2></div>
		</div>
		{propValues.map ( propvalue =>
			<PropValue
			key={propvalue.key}
			{...propvalue}
 			onClick={() => onValueClick(propvalue.key)}
		  />
		)}
	</div>
)};
	
PropValueList.propTypes={
	propValues:PropTypes.arrayOf(PropTypes.shape({
	onCLick: PropTypes.func,
	object: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
	}).isRequired).isRequired
}

export default PropValueList