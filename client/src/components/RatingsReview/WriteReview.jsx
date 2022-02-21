import React, { useState } from 'react';
import StarRating from './StarRating.jsx';

function WriteReview(props) {
  const [isOpen, setIsOpen] = useState(false);

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  function renderChars () {
    return (
      <div>Hey</div>
    );
  }

  return (
    <>
      <button type="button" onClick={togglePopup}>Write New Review</button>

      {isOpen && (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>x</span>
          <h3>Write Your Review</h3>
          <h5>About the Cringe</h5>
          <form>
            <StarRating />
            <div>Recommend Product?</div>
            <input type="radio" id="yes" name="recommended" value="yes" />
            <label for="yes">Yes</label>
            <br />
            <input type="radio" id="no" name="recommended" value="no" />
            <label for="no">No</label>
            <br />
            <label htmlFor="summary">Summary:</label>
            <br />
            <input type="text" name="summary" />
            <br />
            <label htmlFor="body">Body:</label>
            <br />
            <textarea name="body" cols="40" rows="5" />
            <br />
            <label htmlFor="nickname">Nickname:</label>
            <br />
            <input type="text" name="nickname" />
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input type="text" name="email" />
            <br />
          </form>
        </div>
      </div>
      )}
    </>
  );
}

export default WriteReview;
