import React from 'react';
import { withRouter } from 'react-router-dom';
import { OptionsTop, OptionsLeft } from './constHeader.js';
import './Header.css';

function setColl_Resp(mobile, collapse){
  //console.log("setColl_Resp");
  let x = null, y = null;
  x = document.getElementsByClassName("nav-vertical")[0];
  y = document.getElementsByClassName("app-container")[0];
  if (mobile) {
    if(y !== null) y.className = "app-container navbar-collapsed-responsive";
    if (collapse){
      if(x !== null) x.className = "nav-vertical responsive resp-collapsed";
    } else {
      if(x !== null) x.className = "nav-vertical responsive";
    }
  } else {
    if (collapse){
      if(x !== null) x.className = "nav-vertical collapsed";
      if(y !== null) y.className = "app-container navbar-collapsed";
    } else {
      if(x !== null) x.className = "nav-vertical";
      if(y !== null) y.className = "app-container";
    }
  }
}


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.responsive = this.responsive.bind(this);
    this.parentState = props.parentState;
    this.updateParent = props.updateParent;
    document.body.onresize = this.responsive;
    if (this.parentState().mobile === null) {
      let state = 600 > this._getwidth();
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
    if (width > 600){
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
    //console.log("componentDidMount", this.parentState());
    //if (this.parentState().mobile) this.toogle();
  }
  componentDidUpdate(){
    let state = this.parentState()
    // console.log("componentDidUpdate",state);
    setColl_Resp(state.mobile, state.collapsed)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsive);
  }

  render(){
    //console.log("render " + this.state.mobile);
    //console.log(this.props.location);
    let mob = this.parentState().mobile, loc = this.props.location.pathname;
    let user = {name: "ads"}; //user = null;

    const top = <OptionsTop mobile={mob}
                    user={user} currentlocation={loc}/>;
    const left = <OptionsLeft mobile={mob}
                    user={user} currentlocation={loc}/>
    return (
      <nav id="navbar">
        <div className="header">
          <button className="toogle" onClick={this.toogle.bind(this)}>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <span className="navbar-icon">
            <img alt="logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"/>
          </span>
        </div>
        {top}
        {left}
      </nav>
    );
  }
}


export default Header = withRouter(Header);
