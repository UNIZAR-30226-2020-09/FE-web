import React from 'react';
import { withRouter } from 'react-router-dom';
import { OptionsTop, OptionsLeft } from './constHeader.js';
import './Header.css';

import logo from '../cte/pandora-texto-blanco.png';

function setColl_Resp(mobile, collapse, user){
  //console.log("setColl_Resp");
  let x = document.getElementsByClassName("nav-vertical")[0] || null;
  let y = document.getElementsByClassName("app-container")[0] || null;
  if (mobile) {
    if(y !== null) y.className = "app-container navbar-hidden";
    if(x !== null) x.className = "nav-vertical responsive " + (collapse? "resp-collapsed":"");
  } else {
    if(x !== null) x.className = "nav-vertical " + (collapse? "collapsed":null);
    if(y !== null) y.className = "app-container navbar-" + (collapse? "collapsed":"active");
  }
  if (user === null)
    if(y !== null)
      y.className = "app-container navbar-hidden" + (mobile? " responsive":"");
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.width_max = 705;
    this.responsive = this.responsive.bind(this);
    this.toogle = this.toogle.bind(this);
    this.parentState = props.parentState;
    this.updateParent = props.updateParent;
    this.getUser = props.user;
    document.body.onresize = this.responsive;
    if (this.parentState().mobile === null) {
      let state = this.width_max > this._getwidth();
      this.updateParent({
        mobile: state,
        collapsed: state? true:false
      });
    }
  }

  // Get width to all cost
  _getwidth(){
    let w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    return width
  }

  responsive(){
    let mobile = this.parentState().mobile, width = this._getwidth();
    // console.log("Width: " + width);

    // Change state
    if (width > this.width_max){
      if (mobile){
        this.updateParent({mobile: false});
      }
    } else {
      if (!mobile){
        this.updateParent({mobile: true});
      }
    }
  }
  toogle(){
    let coll = this.parentState().collapsed;
    this.updateParent({collapsed: !coll});
  }

  // Set event response
  componentDidMount() {
    window.addEventListener('resize', this.responsive);
  }
  componentDidUpdate(){
    let state = this.parentState();
    // console.log("componentDidUpdate",state);
    setColl_Resp(state.mobile, state.collapsed, this.getUser());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsive);
  }

  render(){
    let mob = this.parentState().mobile, loc = this.props.location.pathname;
    let user = this.getUser();
    let cond = user===null && !mob;

    const top = <OptionsTop mobile={mob} setUser={this.updateParent}
                    user={user} currentlocation={loc}/>;
    const left = <OptionsLeft mobile={mob} setUser={this.updateParen}
                    user={user} currentlocation={loc}/>

    return (
      <nav id="navbar">
        <div className="header">
          <button className="toogle"
                onClick={cond? null:this.toogle}
                style={cond? {
                  cursor: 'none',
                  visibility : 'hidden',
                  padding: '12px 0',
                  margin: '10px 0'
                }:null}
                >
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <span className="navbar-icon">
            <img alt="logo" src={logo}/>
          </span>
        </div>
        {top}
        {left}
      </nav>
    );
  }
}

export default Header = withRouter(Header);
