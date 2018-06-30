import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';
import _ from 'lodash';

ReactDOM.render(
	<ErrorBoundary> 
		<App/> 
	</ErrorBoundary> , document.getElementById('root'))


