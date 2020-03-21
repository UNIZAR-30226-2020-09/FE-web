import React from 'react';
import {Cookie} from '../utils';
import { history } from '../utils';

class Redirection extends React.Component {
  constructor(props){
    super(props);
    this.update = props.updateParent;
    this.state = history.location.state;
    //if (this.state === null) this.state = {logout: false};
  }

  componentDidMount(){
    let ck = Cookie.get();
    if (ck === null){
      this.update({user: null});
      history.push('/home');
    } else {
      if (this.state === null) history.push('/home');
      if (this.state.logout){
        Cookie.clear();
        this.update({user: null});
        history.push('/home');
      } else {
        history.push('/welcome');
      }
    }
  }

  render(){
    return null;
  }
}

export default (Redirection);
