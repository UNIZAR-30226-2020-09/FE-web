import React from 'react';
import './PassModal.css';


const PassModal = ({ handleClose, show, children }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div>
          {children}
        </div>
        <div>
          <button onClick={handleClose}>close</button>
        </div>
      </div>
    </div>
  );

};

export default PassModal;
