import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alerts from './cte/Alerts'
import Err_404 from './Err_404';
import Redirection from './Redirection';
import About from './About/About';
import Header from './Header/Header';
import Home from './Home/Home';
import Passwords from './Passwords/Passwords';
import Settings from './Settings/Settings';
import { Cookie, history } from '../utils';
import { setToken } from '../agent';

class App extends React.Component {
  constructor(props){
    super(props);
    this.updateHandlerCookie = this.updateHandlerCookie.bind(this);
    let global_state = Cookie.get();
    if (global_state === null) {
      this.state = {
        mobile: null,
        collapsed: false,
        user: null
      };
      //Cookie.set(this.state); //NO NECESARIO PORQUE AL SER NULL HEADER LO ARREGLA
    } else {
      this.state = {
        mobile: null,
        collapsed: false,
        user: global_state.user
      };
      if (this.state.user!==null) setToken(this.state.user.token);
    }

    if (this.state.user === null) {
      let path = history.location.pathname;
      if (path === '/passwords') history.push('/');
      else if (path === '/categories') history.push('/');
      else if (path === '/settings') history.push('/');
    }
  }

  updateState(state) {
    //console.log("Update: ", state);
    this.setState(state);
  }
  getState(){
    return this.state;
  }
  getUser(){
    return this.state.user;
  }

  updateHandlerCookie(event){
    let c = Cookie.confirm(event) || null;
    if (c === null) return;
    // Actualizamos lo que nos interesa
    this.setState({
      user: c.user
    });
  }

  componentDidMount(){
    window.addEventListener('storage', this.updateHandlerCookie);
  }
  componentDidUpdate(){
    //console.log("APP Update: ", this.state);
    Cookie.set(this.state);
  }
  componentWillUnmount(){
    window.removeEventListener('storage', this.updateHandlerCookie);
  }

  render() {
    //console.log("App State: ", this.state);
    return (
      <div>
        <Header updateParent={this.updateState.bind(this)}
                parentState={this.getState.bind(this)}
                user={this.getUser.bind(this)}/>
        <Alerts/>
        <Switch>
          <Route exact path="/" component={ () =>
             <Redirection updateParent={this.updateState.bind(this)}/>
          } />
          <Route path="/home" component={ () =>
            <Home user={this.getUser.bind(this)}/>
          } />
          <Route path="/passwords" component={ () =>
            <Passwords getUser={this.getUser.bind(this)}/>
          } />
          <Route path="/categories" component={Err_404} />
          <Route path="/settings" component={ () =>
            <Settings getUser={this.getUser.bind(this)}
              updateParent={this.updateState.bind(this)}/>
          } />
          <Route path="/about" component={ () =>
            <About/>
          } />
          <Route component={Err_404} />
        </Switch>
      </div>
    );
  }
}

export default (App);
