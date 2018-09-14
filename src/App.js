import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { Census } from './census/census.component';
import { history } from './_helpers';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path='/' component={Census} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
