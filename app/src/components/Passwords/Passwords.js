import React from 'react';
import PassModal from './PassModal';
import NewPass from './NewPass';
import './Passwords.css';

class Passwords extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  };
  hideModal() {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="passwords">
        <div className="group">

          <button type="button" className="btn" onClick={this.showModal} >
            Nueva contraseña
          </button>

          <div className="pass-box">
          </div>
          <div className="pass-box">
          </div>
          <div className="pass-box">
          </div>
        </div>
        <PassModal show={this.state.show} handleClose={this.hideModal}>
          <NewPass />
        </PassModal>
      </div>
    );
  }
}

export default Passwords;
