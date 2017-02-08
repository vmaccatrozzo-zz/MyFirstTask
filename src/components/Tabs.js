import React, { PropTypes } from 'react';
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const ProvTabs = ({ propValues, onValueClick, expandClick, extraLinkClick, errorText, isFetching}) => {
   console.log(errorText)
    return (
        <div>    
            {isFetching ? 
                <div>
                    <div style={{zIndex: 3, width: '100%', height: '100%', position: 'absolute', left: '50%',  top: '50%'}}><i className="fa fa-spinner fa-spin fa-5x"></i></div>
                    <div style={{ opacity: 0.5, position: 'relative' }}>
                        {/*{ !errorText  ? null :
                            <div style={{ backgroundColor: 'red', opacity: 0.2 }} className="container">
                                <div className="container" style={{ fontWeight: "bold", color: 'black', opacity: 1 }}><h5 >Resource not available.</h5></div>
                            </div>
                        }*/}
                        <Tabs> 
                            <TabList>
                                {Object.keys(propValues).map((tabName) =>
                                    tabName === 'Other sources' ? null : <Tab key={tabName}> <h5>{tabName}</h5> </Tab>
                                )}
                                <Tab key={'Other sources'}><h5>Other sources</h5></Tab>
                            </TabList>

                            {Object.keys(propValues).map((tabName, idx) =>
                                tabName === 'Other sources' ? null :
                                    <TabPanel key={idx}>
                                        <PropValueList
                                            key={idx}
                                            propValues={propValues[tabName]}
                                            onValueClick={onValueClick}
                                            expandClick={expandClick}
                                            extraLinkClick={extraLinkClick}
                                        />
                                    </TabPanel>
                            )}
                            <TabPanel>
                                <PropValueList
                                    key={propValues.length}
                                    propValues={propValues['Other sources']}
                                    onValueClick={onValueClick}
                                    expandClick={expandClick}
                                    extraLinkClick={extraLinkClick}
                                />
                            </TabPanel>

                        </Tabs>
                    </div>
                </div>
                :
                
                <div>
                    {!errorText  ? null:
                        <div style={{ backgroundColor: 'red', opacity: 0.2 }} className="container">
                            <div className="container" style={{ fontWeight: "bold", color: 'black', opacity: 1 }}><h5 >Resource not available.</h5></div>
                        </div>
                    }
                    <Tabs>
                        <TabList>
                            {Object.keys(propValues).map((tabName) =>
                                tabName === 'Other sources' ? null : <Tab key={tabName}> <h5>{tabName}</h5> </Tab>
                            )}
                            <Tab key={'Other sources'}><h5>Other sources</h5></Tab>
                        </TabList>

                        {Object.keys(propValues).map((tabName, idx) =>
                            tabName === 'Other sources' ? null :
                                <TabPanel key={idx}>
                                    <PropValueList
                                        key={idx}
                                        propValues={propValues[tabName]}
                                        onValueClick={onValueClick}
                                        expandClick={expandClick}
                                        extraLinkClick={extraLinkClick}
                                    />
                                </TabPanel>
                        )}
                        <TabPanel>
                            <PropValueList
                                key={propValues.length}
                                propValues={propValues['Other sources']}
                                onValueClick={onValueClick}
                                expandClick={expandClick}
                                extraLinkClick={extraLinkClick}
                            />
                        </TabPanel>

                    </Tabs>
                </div>
            }
        </div>
    )
}

export default ProvTabs