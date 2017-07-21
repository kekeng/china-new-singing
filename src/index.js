import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Router, Route, browserHistory } from 'react-router'
import MemberListComponent from './components/MemberList.js'
import MemberPageComponent from './components/MemberPage.js'

// Render the main component into the dom
ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={App}/>
	  <Route path="/member-list" component={MemberListComponent}/>
	  <Route path="/member-page" component={MemberPageComponent}/>
	</Router>), document.getElementById('app'));
