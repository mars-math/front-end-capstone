/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-else-return */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewImages from './ReviewImages.jsx';
import Stars from './ratingexampledata/stars.js';
import API_KEY from '../../../../config/config.js';

const {
  almostStar, quarterStar, halfStar, fullStar, emptyStar,
} = Stars;

export default function IndividualReview(props) {
  const {render} = props;
  const [helpfulNum, setHelpfulNum] = useState(render.helpfulness);
  const [buttonPressed, setButtonPressed] = useState(true);
  const [toggleBody, setToggleBody] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  // -----MESS WITH STATE FUNCTIONS-------------
  function incrementHelpfulness() {
    axios.put(`/reviews/${render.review_id}/helpful`)
      .then(() => setHelpfulNum((prevNum) => prevNum + 1))
      .catch((err) => console.log(err));
  }

  function bodyToggle() {
    setToggleBody(!toggleBody);
  }

  useEffect(() => {
    setHelpfulNum(render.helpfulness);
  }, [render]);
  // ------OTHER FUNCTIONS--------------
  function whichStar(rating, index) {
    if (rating >= index + 1) {
      return fullStar;
    } else {
      if (rating === (index + 0.5) || (rating > index + 0.33 && rating < index + 0.66)) {
        return halfStar;
      }
      if (rating <= index + 0.33 && rating > index) {
        return quarterStar;
      }
      if (rating >= index + 0.66) {
        return almostStar;
      }
      return emptyStar;
    }
  }

  function tooBig(body) {
    if (body.length > 250) {
      const shortened = `${body.slice(0, 250)}...`;
      return toggleBody ? <>
        <div style={{inlineSize: '550px', overflowWrap: 'break-word'}}>{body}</div>
       <button onClick={bodyToggle}>Show Less</button>
                          </>
        : <>
      <div style={{inlineSize: '550px', overflowWrap: 'break-word'}}>{shortened}</div>
      <button onClick={bodyToggle}>Show More</button>
          </>;
    } else {
      return <div style={{inlineSize: '550px', overflowWrap: 'break-word'}}>{body}</div>;
    }
  }

  function photosExist(photos) {
    if (photos.length !== 0) {
      return photos.map((photo, index) => <ReviewImages photo={photo.url} key={`photos${index}`} />);
    } else {
      return <></>;
    }
  }

  return (
      <div className="individual-review" style={{width: '92%'}}>
      {/* --------------STARS---------------- */}
      <div className="ind-top-row">
      <div>
      {[...Array(5)].map(
        // eslint-disable-next-line react/no-array-index-key
        (star, index) => <span key={`star${index}`}>{whichStar(render.rating, index)}</span>,
      )}
      </div>
      {/* --------------NAME---------------- */}
      <div style={{color: '#808080', fontSize: '.8em', marginLeft: 'auto'}}>
      {render.reviewer_name}
      -
      {' '}
      </div>
      {/* --------------DATE---------------- */}
      <div style={{color: '#808080', fontSize: '.8em'}}>{new Date(render.date).toLocaleString().split(',')[0]}</div>
      </div>
      {/* --------------summary---------------- */}
      <div style={{display: 'flex', width: '100%'}}>
        <h2 style={{margin: '8px'}}>{render.summary}</h2>
      </div>
      {/* --------------REVIEW BODY---------------- */}
      <div style={{display: 'flex', justifyContent: 'flex-start', margin: '5px', width: '100%'}}>
      {tooBig(render.body)}
      </div>
      {/* --------------RECOMMENDED?---------------- */}
      {render.recommend ? <div style={{marginLeft: '4px', marginBottom: '4px', fontWeight: 'bold'}}> ✓ Recommended</div> : <></>}
      {/* --------------IS THERE SELLER RESPONSE?---------------- */}
      <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: '#C5C5C5'}}>
      {render.response ? (
        <>
          <h4 style={{margin: '8px 0 4px 0', width: '100%'}}>Response From the Seller: </h4>
          <div>{render.response}</div>
        </>
      ) : <></>}
      </div>
      {/* --------------ARE THERE PHOTOS?---------------- */}
      <div style={{
        display: 'flex', justifyContent: 'flex-start', margin: '5px', width: '100%',
      }}
      >
      {photosExist(render.photos)}
      </div>
      {/* --------------HELPFUL COUNTER---------------- */}
        <div style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '4px'}}>
          <span>
          Helpful?
          {' '}
          </span>
        {buttonPressed && (
          <button
            style={{marginLeft: '5px', marginRight: '5px'}}
            className="star-filter-button"
            type="button"
            onClick={() => {
              incrementHelpfulness();
              setButtonPressed(!buttonPressed);
            }}
          >
          Yes
          </button>
        )}
        <span style={{color: '#808080', fontSize: '.8em'}}>
        (
        {helpfulNum}
        )
        </span>
        </div>
      </div>
  );
}
