import React, { PropTypes } from 'react'
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const ProvTabs = ({ propValues , onValueClick, expandClick, extraLinkClick  }) => {
    return(
        <Tabs>
            <TabList>
                {Object.keys(propValues).map ( (tabName) => 
                    tabName === 'Other sources' ?  null : <Tab key = {tabName}> <h5>{tabName}</h5> </Tab>
                )}
                <Tab key = {'Other sources'}><h5>Other sources</h5></Tab>
            </TabList>
        
            {Object.keys(propValues).map ( (tabName, idx) => 
                tabName === 'Other sources' ?  null :
                    <TabPanel key = {idx}>
                        <PropValueList 
                            key = {idx}
                            propValues = {propValues[tabName]} 
                            onValueClick = {onValueClick} 
                            expandClick = {expandClick} 
                            extraLinkClick = {extraLinkClick}
                        />
                    </TabPanel>
            )}
            <TabPanel>
                <PropValueList 
                    key = {propValues.length}
                    propValues = {propValues['Other sources']} 
                    onValueClick = {onValueClick} 
                    expandClick = {expandClick} 
                    extraLinkClick = {extraLinkClick}
                />
            </TabPanel>
               
      </Tabs>
    )
}

export default ProvTabs