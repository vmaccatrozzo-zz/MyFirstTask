import React, { PropTypes } from 'react'
import PropValue from './PropValue'

const PropValueList = ({ propValues , onValueClick}) => {console.log(propValues); return(
	
	<table style={{width:'100%'}}>
		<thead>
			<tr>
				<th width = '40%'>Property</th>
				<th width = '40%'>Object</th>
				<th width = '20%'>Provenance</th>
			</tr>
		</thead>
		<tbody>
		{propValues.map ( propvalue =>
			<PropValue
			key={propvalue.key}
			{...propvalue}
 			onClick={() => onValueClick(propvalue.key)}
		  />
		)}
		</tbody>
	</table>
)};
	
PropValueList.propTypes={
	propValues:PropTypes.arrayOf(PropTypes.shape({
	onCLick: PropTypes.func,
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
	}).isRequired).isRequired
}

export default PropValueList