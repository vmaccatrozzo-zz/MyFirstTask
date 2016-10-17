import React, { PropTypes } from 'react'

const PropValue = ({onClick, property, value, provenance, selected }) => (
  	
  	<tr>
		<td> {property} </td>
		<td onClick={onClick}
			style={{
			  color: selected ? 'yellow' : 'black'
			}}> {value} </td>
		<td> {provenance} </td>
	</tr>
)

PropValue.propTypes = {
    onValueCLick: PropTypes.func,
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
}

export default PropValue
