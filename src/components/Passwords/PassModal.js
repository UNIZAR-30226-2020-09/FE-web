import React from 'react';
import './PassModal.css';

const PassModal = ({ handleClose, show, children }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div>
          <button className="butn" onClick={handleClose}>Cancelar</button>
        </div>
          {children}
      </div>
    </div>
  );

};

export default PassModal;
