import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { Arena } from './components/pages/Arena';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/arena" component={Arena} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
