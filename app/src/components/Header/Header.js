import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'


const top = [[
  {id:1, name: 'Iniciar Sesión', link: '/login', icon: 'fas fa-sign-in-alt'},
  {id:2, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'}
], [
  {id:3, name: 'Cerrar Sesión', link: '/', icon: 'fas fa-sign-out-alt'},
  {id:4, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'},
]];
const left = [[
  {id:5, name: 'Inicio', link: '/', icon: 'fas fa-home'},
  {id:6, name: 'Iniciar Sesión', link: '/login', icon: 'fas fa-sign-in-alt'}
],[
  {id:7, name: 'Inicio', link: '/', icon: 'fas fa-home'},
  {id:8, name: 'Mis Contraseñas', link: '/', icon: 'fas fa-key'},
  {id:9, name: 'Ajustes', link: '/', icon: 'fas fa-cog'},
  {id:10, name: 'Cerrar sesión', link: '/', icon: 'fas fa-sign-out-alt'}
]];

const OptionsTop = props => {
  if (props.mobile) {
    return null;
  }
  let user = 0, log = null;
  if (props.user){
    /*log = (
      <li key={user} className="nav-top-item nav-text">
        {props.user.name}
      </li>
    )*/
    user = 1
  }
  return (
    <div className="collapse">
      <ul>
      {log}
      {props.opts[user].map((opt) =>
        <li key={opt.id}>
          <Link to={opt.link} className="nav-top-item">
            <span className={opt.icon}/> {opt.name}
          </Link>
        </li>
      )}
      </ul>
    </div>
  );
};

const OptionsLeft = props => {
  let cls = "nav-vertical"
  if (props.mobile) {
    cls += " responsive";
  }
  let user = 0;//, log = null;
  if (props.user){
    user = 1
  }
  return(
    <div className={cls}>
      <ul>
      {props.opts[user].map((opt) =>
        <li key={opt.id} className="nav-left-item">
          <Link to={opt.link}>
            <span className={opt.icon}/>
            <i>{opt.name}</i>
          </Link>
        </li>
      )}
      </ul>
      <div className="spacer"/>
      <ul>
        <li className="nav-left-item">
          <a href="https://www.google.com/">
            <span className="fas fa-book"/>
            <i>Documentación</i>
          </a>
        </li>
        <li className="nav-left-item">
          <a href="https://www.google.com/">
            <span className="fas fa-info-circle"/>
            <i>About</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

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
    //let user = null;
    let user = {name: "ads"}
    const tp = <OptionsTop mobile={this.state.mobile} user={user} opts={top}/>;
    const lf = <OptionsLeft mobile={this.state.mobile} user={user} opts={left}/>
    if (!this.state.mobile){
      return(
        <Static top={tp} left={lf}/>
      );
    } else if (this.state.mobile)  {
      return(
        <Static top={tp} left={lf}/>
      );
    }
    return null;
  }
}

//// TODO:  -collapse con cuerpo de App
////        -spacer entre listas lef-navbar
////        -active? => state?
////        -
////        -
export default Header;
