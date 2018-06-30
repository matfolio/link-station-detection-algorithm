/* view data using this component */

import React from 'react'; /* Needed for a react component*/
import '../style.css'; /* using the required loader to handle the css import */

const Result = (props) => {
	let result = props.result === "" ? "" : <h2 className="main">{props.result}</h2>
	return result;
}

export default Result