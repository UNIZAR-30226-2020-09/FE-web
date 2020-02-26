import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'


const top = [
  {name: 'Home', link: '/', icon: 'fas fa-home'},
  {name: 'Home2', link: '/login', icon: ''},
  {name: 'H1', link: '/test', icon: ''}
];

const OptionsTop = props => {
  if (props.something) {
    return (
      <ul className="">
        {props.opts.map((opt) =>
          <li>
            <Link to={opt.link} className="nav-item">
              <span class={opt.icon}/>{opt.name}
            </Link>
          </li>
        )}
        <li className="nav-item">{props.width}</li>
      </ul>
    );
  }
  return null;
};


class Header extends React.Component {
  //constructor() {}
  render(){
    return(
      <nav className="topnav">
        <OptionsTop something={true} opts={top}/>
      </nav>
    )
  }
}

export default Header;
