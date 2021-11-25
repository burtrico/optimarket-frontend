import React from "react";
import '../index.css';

// source: https://www.cluemediator.com/create-simple-popup-in-reactjs

const Popup = ({handleClose, content, nftObj}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};
 
export default Popup;