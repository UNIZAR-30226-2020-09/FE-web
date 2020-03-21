import React from 'react';
import { Route, Switch } from 'react-router-dom';
import React_Home from '../components/React_home';
import Header from './Header/Header';
import Home from './Home/Home';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        mobile: null,
        collapsed: false,
        token: null
      };
  }

  updateState(state) {
    // console.log("Update: " + state);
    this.setState(state);
  }
  getState(){
    return this.state;
  }

  render() {
    return (
      <div>
        <Header updateParent={this.updateState.bind(this)}
                parentState={this.getState.bind(this)}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={React_Home} />
          <Route path="/passwords" component={React_Home} />
          <Route path="/settings" component={React_Home} />
          <Route path="/login" component={React_Home} />
          <Route path="/login" component={React_Home} />
        </Switch>
      </div>
    );
  }
}

export default (App);
