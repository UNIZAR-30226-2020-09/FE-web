import React from 'react';
import logo from '../logo.svg';
import '../App.css';


class React_Home extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </div>
    );
  }
}

export default (React_Home);
