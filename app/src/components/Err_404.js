import React from 'react';
import logo from '../logo.svg';
import './App.css';


class Err_404 extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="Err-page">
          <img src={logo} className="Err-logo" alt="logo" />
          <p>
            404 - Page Not Found
          </p>
        </div>
      </div>
    );
  }
}

export default (Err_404);
