import React from 'react';
import { withRouter } from 'react-router-dom';
import { OptionsTop, OptionsLeft } from './constHeader.js';
import './Header.css'

function toogle() {
  // console.log("onClick");
  let x = document.getElementsByClassName("nav-vertical")[0];
  let y = document.getElementsByClassName("app-container")[0];
  if (x.classList.contains("resp-collapsed")){
    // Modelo movil aka responsive
    x.className = "nav-vertical responsive"
    y.className = "app-container navbar-collapsed-responsive";
  } else if (x.classList.contains("responsive")) {
    x.className +=  " resp-collapsed";
    y.className = "app-container navbar-collapsed-responsive";
  } else {
    // Modelo web
    if (x.className === "nav-vertical") {
      x.className += " collapsed";
      if (y !== null) {
         y.className += " navbar-collapsed";
      }
    } else {
      x.className = "nav-vertical";
      if (y !== null) {
        y.className = "app-container";
      }
    }
  }
}

const Static = props => {
  return(
    <nav id="navbar">
      <div className="header">
        <button className="toogle" onClick={toogle}>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </button>
        <span className="navbar-icon">
          <img alt="logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"/>
        </span>
      </div>
      {props.top}
      {props.left}
    </nav>
  );
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.responsive = this.responsive.bind(this);
    //this._getwidth = this._getwidth.bind(this);
    this.state = {
      mobile: 600 > this._getwidth()
    };
    document.body.onresize = this.responsive;
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
    let mobile = this.state.mobile, width = this._getwidth();
    //console.log("responsive: " + width);

    // Change state
    if (width > 600){
      if (mobile){
        this.setState({mobile: false});
      }
    } else {
      if (!mobile){
        this.setState({mobile: true});
      }
    }
  }

  // Set event response
  componentDidMount() {
    window.addEventListener('resize', this.responsive);
    if (this.state.mobile) toogle();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsive);
  }


  render(){
    //console.log("render " + this.state.mobile);
    //console.log(this.props.location);
    //let user = null;
    let user = {name: "ads"}, loc = this.props.location.pathname;
    const tp = <OptionsTop mobile={this.state.mobile}
                    user={user} currentlocation={loc}/>;
    const lf = <OptionsLeft mobile={this.state.mobile}
                    user={user} currentlocation={loc}/>
    /*if (!this.state.mobile){
      return(
        <Static top={tp} left={lf}/>
      );
    } else if (this.state.mobile)  {
      return(
        <Static top={tp} left={lf}/>
      );
    }
    return null;*/
    return (<Static top={tp} left={lf}/>);
  }
}


export default Header = withRouter(Header);
