import React, { PropTypes } from 'react'
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const ProvTabs = ({ propValues , onValueClick, expandClick, extraLinkClick  }) => {
    
    return(
        <Tabs>
            <TabList>
                {Object.keys(propValues).map ( (tabName, idx) => 
                    <Tab key = {idx}> {tabName} </Tab>
                )}
            </TabList>
        
            {Object.values(propValues).map ( (propValue, idx) => 
                <TabPanel key = {idx}>
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