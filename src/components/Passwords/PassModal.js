import React from 'react';
import './PassModal.css';

const PassModal = ({ handleClose, show, children }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
          {children}
      </div>
    </div>
  );

};

export default PassModal;
