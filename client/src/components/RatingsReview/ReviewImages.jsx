import React, { useState } from 'react';

function ReviewImages(props) {
  const [isOpen, setIsOpen] = useState(false);

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <span>
        <input
          type="image"
          style={{ width: '50px', height: '50px', margin: '5px 10px 0 0' }}
          src={props.photo}
          alt="Nothing Here"
          onClick={togglePopup}
        />
      </span>

      {isOpen && (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>x</span>
          <img src={props.photo} alt="Nothing here" />
        </div>
      </div>
      )}
    </>
  );
}

export default ReviewImages;
