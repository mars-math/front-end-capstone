import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import API_KEY from '../../../../config/config.js';

function WriteReview(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [charData, setcharData] = useState({});
  const [itemName, setItemName] = useState('');
  const [imgUrls, setImgUrls] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [postObj, setPostObj] = useState({});
  const [charObj, setCharObj] = useState({});

  console.log(postObj);
  console.log(charObj);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios.all([
      axios.get('reviews/meta?product_id=43230'),
      axios.get('/products/43230'),
    ])
      .then(axios.spread((data1, data2) => {
        setcharData(data1.data.characteristics);
        setItemName(data2.data.name);
      }));
  }, []);

  function buildCharObj(key, value) {
    const copyObj = { ...charObj };
    copyObj[key] = value;
    setCharObj(copyObj);
  }

  function renderChars() {
    if (charData) {
      return (
        Object.keys(charData).map((char, index) => (
          <div key={`${char}${index}`}>
            <div>{char}</div>
            <fieldset onChange={(e) => buildCharObj(charData[char].id, e.target.value)}>
              <label htmlFor={char}>
                <input type="radio" id={char} name={char} value="1" />
                1
              </label>

              <label htmlFor={char}>
                <input type="radio" id={char} name={char} value="2" />
                2
              </label>

              <label htmlFor={char}>
                <input type="radio" id={char} name={char} value="3" />
                3
              </label>

              <label htmlFor={char}>
                <input type="radio" id={char} name={char} value="4" />
                4
              </label>

              <label htmlFor={char}>
                <input type="radio" id={char} name={char} value="5" />
                5
              </label>
            </fieldset>

          </div>
        ))

      );
    }
  }

  function imgButtonClick() {
    if (imgUrl.length > 5) {
      const imgUrlsCopy = [...imgUrls];
      imgUrlsCopy.push(imgUrl);
      setImgUrls(imgUrlsCopy);
    }
  }

  function buildPost(key, value) {
    const copyObj = { ...postObj };
    copyObj[key] = value;
    setPostObj(copyObj);
  }

  return (
    <>
      <button type="button" onClick={togglePopup}>Write New Review</button>

      {isOpen && (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>x</span>
          {/* --------TITLE----------- */}
          <h3>Write Your Review</h3>
          <h4>
            About the
            {' '}
            {itemName}
          </h4>
          <form>
            {/* --------STAR RATING----------- */}
            <StarRating />
            {/* --------RECOMMENDED?----------- */}
            <div>Recommend Product?</div>
            <fieldset onChange={(e) => buildPost('recommend', (e.target.value === 'yes'))}>
              <label htmlFor="yes">
                <input type="radio" id="yes" name="recommended" value="yes" />
                Yes
              </label>
              <br />
              <label htmlFor="no">
                <input type="radio" id="no" name="recommended" value="no" />
                No
              </label>
            </fieldset>
            <br />
            {/* --------CHARACTERISTICS----------- */}
            {renderChars()}
            {/* --------SUMMARY----------- */}
            <label htmlFor="summary">Summary:</label>
            <br />
            <input type="text" name="summary" />
            {/* --------BODY----------- */}
            <br />
            <label htmlFor="body">Body:</label>
            <br />
            <textarea name="body" cols="40" rows="5" />
            <br />
            {/* --------IMG----------- */}
            {imgUrls.length > 0 ? imgUrls.map((img, index) => (
              <img
                key={`${img}${index}`}
                src={img}
                style={{ width: '50px', height: '50px', margin: '5px 10px 0 0' }}
                alt="thumbnail"
              />
            )) : <></>}
            <br />
            {imgUrls.length < 5
              ? (
                <>
                  <label htmlFor="img">Img Url:</label>
                  <br />
                  <input type="text" name="img" onChange={(e) => setImgUrl(e.target.value)} />
                  <button type="button" onClick={imgButtonClick}>Upload</button>
                </>
              )
              : <></>}
            <br />
            {/* --------NICKNAME----------- */}
            <label htmlFor="nickname">Nickname:</label>
            <br />
            <input type="text" name="nickname" />
            <br />
            {/* --------EMAIL----------- */}
            <label htmlFor="email">Email:</label>
            <br />
            <input type="text" name="email" />
            <br />
            {/* --------SUBMIT BUTTON----------- */}
            <input type="submit" value="Write Review" />
          </form>
        </div>
      </div>
      )}
    </>
  );
}

export default WriteReview;
