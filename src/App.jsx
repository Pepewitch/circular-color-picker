import React, { Component } from 'react';
import { Switch } from 'react-router';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Switch>
        {routes}
      </Switch>
    );
  }
}

export default App;
