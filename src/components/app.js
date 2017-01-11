import React from "react";
import PropValueList from './PropertyValueList';
import PropValue from './PropValue';
import ProvTabs from './Tabs';

// http://viaf.org/viaf/97105654
class App extends React.Component {
	
	render() {
		if (typeof this.props.data == 'undefined') {
			return (<div className='container-fluid'>
						<form >
							<div className="form-group text-left">
								<label>Resource URL: <input className='form-control span6  input-xlarge' type="text" id ="input_url" defaultValue="http://viaf.org/viaf/97105654"></input></label>
							</div>
							<div className="form-group text-left">
								<button onClick={this.props.onSampleClick} className='btn btn-default'> Search </button>	
							</div>
						</form>
					</div>
					)
		}else if (typeof this.props.data == 'object'){
				return (
				<div className='container-fluid'>
					<form id = 'result'>
						<div className="form-group text-right">
							<button onClick={this.props.uploadData} className='btn btn-default'> Continue </button>	
						</div>
						<ProvTabs propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick} extraLinkClick={this.props.onLinkClick}/>
						
					</form>
				</div>
			);
		}else{
			return (
				<div className='container-fluid'>
					<p style={{color:'red'}}> {this.props.data}</p>
					<form >
						<div className="form-group text-left">
							<label>Resource URL: <input className='form-control span6  input-xlarge' type="text" id ="input_url" ></input></label>
						</div>
						<div className="form-group text-left">
							<button onClick={this.props.onSampleClick} className='btn btn-default'> Search </button>	
						</div>
					</form>
					
				</div>
			);
 		}
	}
}

// App.propTypes = {
// 	myTableRows: React.PropTypes.array,
// 	onSampleClick: React.PropTypes.func
// };

export default App;
