import React from "react";
import PropValueList from './PropertyValueList';
import PropValue from './PropValue';



class App extends React.Component {
	
	render() {
		if (typeof this.props.data == 'undefined') {
			return (<div>
						<form >
							<label>Resource URL: <input type="text" id ="input_url" defaultValue="http://viaf.org/viaf/97105654"></input></label>
							<button onClick={this.props.onSampleClick} className='btn btn-primary btn-md'> Search </button>	
						</form>
					</div>
					)
		}else{
			return (
					<form id = 'result'>
						<PropValueList propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick}/>
						<div className="form-group text-right">
							<button  onClick={this.props.uploadData} className='btn btn-primary btn-md'> Upload </button>	
						</div>
					</form>
			);
 		}
	}
}

// App.propTypes = {
// 	myTableRows: React.PropTypes.array,
// 	onSampleClick: React.PropTypes.func
// };

export default App;
