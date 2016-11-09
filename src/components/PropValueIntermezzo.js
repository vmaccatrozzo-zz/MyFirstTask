import React, { PropTypes } from 'react'
import PropValue from './PropValue'

const PropValueIntermezzo = ({id, propertyList, isExpanded, onValueClick, expandClick}) => { 
    if (!(propertyList)) {
        return null;
    }
    return(
        <div className='row fluid'>
            <PropValue
                {...propertyList[0]}
                hasExpandButton={propertyList.length > 1}
                onClick={() => onValueClick(propertyList[0].property,id)}
                onButtonClick={() => expandClick('#'+propertyList[0].property)}
            />
            <div className={`collapse ${isExpanded ? "out" : "in"}`} id={propertyList[0].property} >
                    {propertyList.map ( (propvalue, idx) => 
                        idx === 0 ? null :
                            <PropValue
                                key = {idx}
                                {...propvalue}
                                hasExpandButton = {false}
                                onClick={() => onValueClick(propvalue.property,idx)}
                            />
                )}
            </div>    
        </div>     
    )
};


// PropValueIntermezzo.propTypes={
// 	propertyList:PropTypes.arrayOf(PropTypes.shape({
// 	onCLick: PropTypes.func,
// 	object: PropTypes.string.isRequired,
// 	property: PropTypes.string.isRequired,
// 	provenance: PropTypes.string.isRequired,
// 	selected: PropTypes.bool.isRequired
// 	}).isRequired).isRequired
// }

export default PropValueIntermezzo
