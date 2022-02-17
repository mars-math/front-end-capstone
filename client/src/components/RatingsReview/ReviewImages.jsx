import React, { useState } from "react";

const ReviewImages = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  function togglePopup () {
    setIsOpen(!isOpen);
  }


  return (
    <>
    <span>
    <input type='image'
    style={{'width': '50px', 'height': '50px', 'margin': '5px 10px 0 0'}}
    src={props.photo}
    onClick={togglePopup}/>
    </span>

    {isOpen && <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={togglePopup}>x</span>
       <img src={props.photo}/>
      </div>
    </div>}
    </>
  );
};

export default ReviewImages;