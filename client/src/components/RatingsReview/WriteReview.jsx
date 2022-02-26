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

  const { updateRender, url } = props;

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios.all([
      axios.get(`reviews/meta?product_id=${url}`),
      axios.get(`/products/${url}`),
    ])
      .then(axios.spread((data1, data2) => {
        setcharData(data1.data.characteristics);
        setItemName(data2.data.name);
      }));
  }, []);

  function buildCharObj(key, value) {
    const copyObj = { ...charObj };
    copyObj[key] = Number(value);
    setCharObj(copyObj);
  }

  function renderChars() {
    if (charData) {
      return (
        Object.keys(charData).map((char, index) => (
          <div key={`${char}${index}`} style={{ display: 'flex', flexWrap: 'wrap' }} data-testid="chars">
            <div style={{ display: 'flex', width: '100%', fontWeight: 'bold' }}>
              {char}
              :
            </div>
            <fieldset style={{ display: 'flex', border: 'none' }} required onChange={(e) => buildCharObj(charData[char].id, e.target.value)}>
              <label htmlFor={char} className="char-selector">
                <input type="radio" id={char} name={char} value="1" />
                1
              </label>

              <label htmlFor={char} className="char-selector">
                <input type="radio" id={char} name={char} value="2" />
                2
              </label>

              <label htmlFor={char} className="char-selector">
                <input type="radio" id={char} name={char} value="3" />
                3
              </label>

              <label htmlFor={char} className="char-selector">
                <input type="radio" id={char} name={char} value="4" />
                4
              </label>

              <label htmlFor={char} className="char-selector">
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

  const buildPost = (key, value) => {
    const copyObj = { ...postObj };
    copyObj[key] = value;
    setPostObj(copyObj);
  };

  function postSubmit(e) {
    e.preventDefault();
    if (postObj.rating && (postObj.recommend !== undefined) && Object.keys(charObj).length === 4
    && postObj.body && postObj.name && postObj.email) {
      const realPostObj = { ...postObj };
      realPostObj.characteristics = charObj;
      realPostObj.product_id = url;
      realPostObj.photos = imgUrls;
      console.log(realPostObj);
      axios.post('/reviews', realPostObj)
        .then(() => {
          togglePopup();
          updateRender();
        })
        .catch((err) => console.log('Sadge', err));
    }
  }

  return (
    <>
      <button type="button" onClick={togglePopup} className="cust-button">Write New Review</button>

      {isOpen && (
      <div className="popup-box" data-testid="popup">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>x</span>
          {/* --------TITLE----------- */}
          <h3>Write Your Review</h3>
          <h4 style={{ marginBottom: '20px', borderBottom: '2px solid black' }}>
            About the
            {' '}
            {itemName}
          </h4>
          <form onSubmit={(e) => postSubmit(e)}>
            {/* --------STAR RATING----------- */}
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Rate This Item:</div>
            <StarRating buildPost={buildPost} />
            {/* --------RECOMMENDED?----------- */}
            <div style={{ fontWeight: 'bold' }}>Recommend Product?</div>
            <fieldset style={{ border: 'none', marginBottom: '5px', borderBottom: '1px solid black'}} required onChange={(e) => buildPost('recommend', (e.target.value === 'yes'))}>
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
            {/* --------CHARACTERISTICS----------- */}
            {renderChars()}
            {/* --------SUMMARY----------- */}
            <label htmlFor="summary" className="write-review-labels" style={{borderTop: '1px solid black' }}>Summary:</label>
            <input
              style={{ width: '200px' }}
              type="text"
              name="summary"
              placeholder="Best purchase ever!"
              onChange={(e) => buildPost('summary', e.target.value)}
            />
            {/* --------BODY----------- */}
            <label htmlFor="body" className="write-review-labels">Body:</label>
            <textarea
              placeholder="Why did you like the product or not?"
              name="body"
              cols="40"
              rows="5"
              required
              minLength="50"
              maxLength="1000"
              onChange={(e) => buildPost('body', e.target.value)}
            />
            <br />
            {/* --------IMG----------- */}
            {imgUrls.length > 0 ? imgUrls.map((img, index) => (
              <img
                key={`${img}${index}`}
                src={img}
                style={{ width: '50px', height: '50px', margin: '5px 10px 0 0' }}
                alt="thumbnail"
                data-testid="image"
              />
            )) : <></>}
            <br />
            {imgUrls.length < 5
              ? (
                <>
                  <label htmlFor="img" className="write-review-labels" data-testid="labels">Img Url:</label>
                  <input type="text" name="img" onChange={(e) => setImgUrl(e.target.value)} data-testid="image-input"/>
                  <button type="button" onClick={imgButtonClick}>Upload</button>
                </>
              )
              : <></>}
            <br />
            {/* --------NICKNAME----------- */}
            <label htmlFor="nickname" className="write-review-labels" data-testid="labels">Nickname:</label>
            <input
              type="text"
              name="nickname"
              placeholder="Example: jackson11"
              required
              minLength="5"
              onChange={(e) => buildPost('name', e.target.value)}
            />
            <br />
            {/* --------EMAIL----------- */}
            <label htmlFor="email" className="write-review-labels" data-testid="labels">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Example: jackson11@email.com"
              required
              onChange={(e) => buildPost('email', e.target.value)}
            />
            <br />
            {/* --------SUBMIT BUTTON----------- */}
            <input type="submit" value="Write Review" className="cust-button" data-testid="write-review-submit"/>
          </form>
        </div>
      </div>
      )}
    </>
  );
}

export default WriteReview;
