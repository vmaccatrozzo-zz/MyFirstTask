import React, { PropTypes } from 'react'

const PropValue = ({ property, value, provenance, selected }) => (
  	
  	<tr>
		<td> {property} </td>
		<td> {value} </td>
		<td> {provenance} </td>
	</tr>
)

PropValue.propTypes = {
//   	onCLick: PropTypes.func,
	
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
}

export default PropValue
