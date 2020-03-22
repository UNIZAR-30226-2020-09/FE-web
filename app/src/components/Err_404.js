import React from 'react';
import logo from '../logo.svg';
import './App.css';


class Err_404 extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            404 - Page Not Found
          </p>
        </div>
      </div>
    );
  }
}

export default (Err_404);
