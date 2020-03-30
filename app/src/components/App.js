import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Err_404 from '../components/Err_404';
import Header from './Header/Header';
import Redirection from './Redirection';
import Home from './Home/Home';
import Settings from './Settings/Settings'
import {Cookie} from '../utils';
import { setToken } from '../agent';

class App extends React.Component {
  constructor(props){
    super(props);
    let pre_state = Cookie.get();
    if (pre_state === null) {
      this.state = {
        mobile: null,
        collapsed: false,
        user: null
      };
    } else {
      this.state = pre_state;
      setToken(this.state.user.token);
    }
  }

  updateState(state) {
    //console.log("Update: ", state);
    this.setState(state);
  }
  componentDidUpdate(){
    Cookie.set(this.state);
  }
  getState(){
    return this.state;
  }
  getUser(){
    return this.state.user;
  }

  render() {
    console.log("App State: ", this.state);
    return (
      <div>
        <Header updateParent={this.updateState.bind(this)}
                parentState={this.getState.bind(this)}
                user={this.getUser.bind(this)}/>
        <Switch>
          <Route exact path="/" component={ () =>
             <Redirection updateParent={this.updateState.bind(this)}/>
           } />
          <Route path="/home" component={Home} />
          <Route path="/welcome" component={Err_404} />
          <Route path="/passwords" component={Err_404} />
          <Route path="/settings" component={ () =>
             <Settings user={this.getUser.bind(this)}
             updateParent={this.updateState.bind(this)}/>
           } />
          <Route component={Err_404} />
        </Switch>
      </div>
    );
  }
}

export default (App);
