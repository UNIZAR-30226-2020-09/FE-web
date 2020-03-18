import React from 'react';
import './BaseModal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // const { index, onlyActiveOnIndex, to, children, ...props } = this.props
    this.props = props;
    const { id } = this.props;
    if (id == null) throw new Error("id NO NULA por Modal");
    else this.id = id;
    //console.log(this.props);
  }

  componentDidMount() {
    let modal = document.getElementById(this.id);
    //modal.style.display = "block";

    // Jerarquia para boton
    let button = modal.childNodes[0].childNodes[0].children[0];
    button.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  render(){
    const { children, id, footer } = this.props;
    return(
      <div id={id} className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <button>
              <span className="fas fa-times"/>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer}
        </div>
      </div>
    );
  }
}


export default Modal;
