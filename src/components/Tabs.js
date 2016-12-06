import React, { PropTypes } from 'react'
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const ProvTabs = ({ propValues , onValueClick, expandClick, extraLinkClick  }) => {
    
    return(
        <Tabs>
            <TabList>
                {Object.keys(propValues).map ( (key, idx) => 
                    <Tab key = {idx}> {key} </Tab>
                )}
            </TabList>
        
            {Object.values(propValues).map ( (propValue, idx) => 
                <TabPanel>
                    <PropValueList 
                        key = {idx}
                        propValues = {propValue} 
                        onValueClick = {onValueClick} 
                        expandClick = {expandClick} 
                        extraLinkClick = {extraLinkClick}
                    />
                </TabPanel>
            )}    
      </Tabs>
    )
}

export default ProvTabs