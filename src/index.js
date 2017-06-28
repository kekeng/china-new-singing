import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Router, Route, browserHistory } from 'react-router'
import InputComponent from './components/Input'

// Render the main component into the dom
ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={App}/>
	  <Route path="/aa" component={InputComponent}/>
	</Router>), document.getElementById('app'));
