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
    this.getUser = props.user;

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
      <div className="app-container">
        <div className="passwords">

          <div className="group">
            <button type="button" className="btn" onClick={this.showModal}>
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
            <NewPass user={this.getUser.bind(this)} handleClose={this.hideModal}/>
          </PassModal>

        </div>
      </div>

    );
  }

}

export default Passwords;