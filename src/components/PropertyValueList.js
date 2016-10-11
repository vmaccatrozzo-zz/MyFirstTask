import React, { PropTypes } from 'react'
import PropValue from './PropValue'
// onClick={() => onValueClick(propvalue.key)}
// const PropValueList = ({ propValues, onValueClick}) => (
class PropValueList extends React.Component {
  	render() {
		return(	<table style="width:100%">
					{this.props.propValues.map ( propvalue =>
						<PropValue
						key={propvalue.key}
						{...propvalue}
						
					  />
					)}
				</table>
		);
	}
}

PropValueList.propTypes={
	propValues:PropTypes.arrayOf(PropTypes.shape({
 	key: PropTypes.number.isRequired,
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
	}).isRequired).isRequired,
  
}

export default PropValueList