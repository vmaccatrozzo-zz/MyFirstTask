import React from "react";
import PropValueList from './PropertyValueList';
import PropValue from './PropValue';



class App extends React.Component {
	
	render() {
		if (typeof this.props.data == 'undefined') {
			return (<div className='container fluid'>
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
		}else{
			return (
				<div className='container fluid'>
					<form id = 'result'>
						<PropValueList propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick}/>
						<div className="form-group text-right">
							<button  onClick={this.props.uploadData} className='btn btn-default'> Upload </button>	
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
