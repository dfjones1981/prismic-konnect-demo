import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import Help from './Help';
import NotFound from './NotFound';
import Page from './Page';
import Task from './Task';

const App = (props) => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/help"/>
      <Route exact path="/page/:uid" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/task/:uid" render={routeProps => <Task {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
