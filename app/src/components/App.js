import React from 'react';
import { Route, Switch } from 'react-router-dom';
import React_Home from '../components/React_home';
import Header from './Header';
// import './App.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={React_Home}/>
          <Route path="/login" component={React_Home} />
        </Switch>
      </div>
    );
  }
}

export default (App);
