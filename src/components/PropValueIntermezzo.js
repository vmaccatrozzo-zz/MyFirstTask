import React, { PropTypes } from 'react'
import PropValue from './PropValue'

const PropValueIntermezzo = ({propertyList, isExpanded, onValueClick, expandClick, extraLinkClick}) => { 
    console.log(propertyList[0])
    if (!(propertyList)) {
        return null;
    }
    if(propertyList.length > 1){
        return(
            <div className='row-fluid text-left'>
            <PropValue
                    {...propertyList[0]}
                    hasExpandButton={propertyList.length > 1}
                    button_type = {isExpanded ? "glyphicon glyphicon-minus":"glyphicon glyphicon-plus"}
                    hasLink_button = {propertyList[0].hasLink ? "glyphicon glyphicon-open":null}
                    onClick={() => onValueClick(propertyList[0].property,0,propertyList[0].provenance)}
                    onButtonClick={() => expandClick(propertyList[0].property,propertyList[0].provenance)}
                    extraLinkClick={() => extraLinkClick(propertyList[0].object)}
                />
                <div className={`collapse ${isExpanded ? "in" : "out"}`} id={propertyList[0].property} >
                    {propertyList.map ( (propvalue, idx) => 
                        idx === 0 ? null :
                            <PropValue
                                key = {idx}
                                {...propvalue}
                                hasExpandButton = {false}
                                hasLink_button={propvalue.hasLink ? "glyphicon glyphicon-open":null}
                                onClick={() => onValueClick(propvalue.property,idx,propvalue.provenance)}
                                extraLinkClick={() => extraLinkClick(propvalue.object)}
                            />
                    )}
                </div>    
            </div>    
    )
    }else{
         return(
            
                <PropValue
                        {...propertyList[0]}
                        hasExpandButton={propertyList.length > 1}
                        button_type = {isExpanded ? "glyphicon glyphicon-minus":"glyphicon glyphicon-plus"}
                        hasLink_button = {propertyList[0].hasLink ? "glyphicon glyphicon-open":null}
                        onClick={() => onValueClick(propertyList[0].property,0,propertyList[0].provenance)}
                        onButtonClick={() => expandClick(propertyList[0].property,propertyList[0].provenance)}
                        extraLinkClick={() => extraLinkClick(propertyList[0].object)}
                />
            
         )

    }
};


PropValueIntermezzo.propTypes={
	propertyList:PropTypes.arrayOf(PropTypes.shape({
	onCLick: PropTypes.func,
	object: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
	}).isRequired).isRequired
}

export default PropValueIntermezzo
