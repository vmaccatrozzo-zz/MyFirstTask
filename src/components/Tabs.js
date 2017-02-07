import React, { PropTypes } from 'react'
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ProvTabs = ({ propValues , onValueClick, expandClick, extraLinkClick , errorText }) => {
    return(
        <div>
            {typeof errorText !='string' ? null:
                <div style={{backgroundColor:'red',opacity:0.2}} className="container">
                    <div className="container" style={{fontWeight: "bold",color:'black',opacity:1}}><h5 >{errorText}</h5></div>
                </div>
            }
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
      </div>
    )
}

export default ProvTabs