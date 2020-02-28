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

const OptionsTop = props => {
  if (props.mobile) return null;
  let user = 0, log = null;
  if (props.user){
    /*log = (
      <li key={user} className="nav-item nav-text">
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
          <Link to={opt.link} className="nav-item">
            <span className={opt.icon}/> {opt.name}
          </Link>
        </li>
      )}
      </ul>
    </div>
  );
};

const Static = props => {
  return(
    <nav className="navbar">
      <div className="header">
        <button className="toogle">
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </button>
        <span className="navbar-icon">
          <img alt="logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"/>
        </span>
      </div>
      {props.top}
      {props.navresponsive}

    </nav>
  );
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.responsive = this.responsive.bind(this);
    //this._getwidth = this._getwidth.bind(this);
    this.state = {
      mobile: document.body.clientWidth > this._getwidth
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
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsive);
  }

  render(){
    //console.log(this.state.mobile);
    //const tp = <OptionsTop mobile={this.state.mobile} user={{name: "ads"}} opts={top}/>;
    const tp = <OptionsTop mobile={this.state.mobile} user={null} opts={top}/>;
    if (!this.state.mobile){
      return(
        <Static top={tp}/>
      );
    } else if (this.state.mobile)  {
      return(
        <Static top={tp}/>
      );
    }
    return null;
  }
}

export default Header;
