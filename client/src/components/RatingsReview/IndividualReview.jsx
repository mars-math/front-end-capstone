import React, { useState } from 'react';
import IndividualExample from './ratingexampledata/individualExample.js'
import Stars from './ratingexampledata/stars.js';
const {almostStar, quarterStar, halfStar, fullStar, emptyStar} = Stars;
const example = IndividualExample.results;
import ReviewImages from './ReviewImages.jsx';

export default function IndividualReview() {

  const [helpfulNum, setHelpfulNum] = useState(example[0].helpfulness);
  const [buttonPressed, setButtonPressed] = useState(true);
  const [toggleBody, setToggleBody] = useState(false);

  //-----MESS WITH STATE FUNCTIONS-------------
  function incrementHelpfulness () {
    setHelpfulNum(prevHelpfulNum => {
      return prevHelpfulNum + 1
    })
  }

  function bodyToggle () {
    setToggleBody(!toggleBody)
  }
  //------OTHER FUNCTIONS--------------
  function whichStar (rating, index) {
    if (rating >= index + 1) {
      return fullStar
    } else {
      if (rating === (index + 0.5) || (rating > index + 0.33 && rating < index + 0.66)) {
        return halfStar;
      }
      if (rating <= index + 0.33 && rating > index) {
        return quarterStar;
      }
      if (rating >= index + 0.66) {
        return almostStar
      }
      return emptyStar
    }
  }

  function tooBig (body) {

    if (body.length > 250) {
      let shortened = body.slice(0, 250) + '...';
      return toggleBody ? <>
      <div style={{'inline-size': '400px', 'overflow-wrap': 'break-word'}}>{body}</div>
      <button onClick={bodyToggle}>Show Less</button>
      </> :
      <>
      <div style={{'inline-size': '400px', 'overflow-wrap': 'break-word'}} >{shortened}</div>
      <button onClick={bodyToggle}>Show More</button>
      </>
    } else {
      return <div style={{'inline-size': '400px', 'overflow-wrap': 'break-word'}} >{body}</div>
    }
  }

  function photosExist(photos) {
    if (photos.length !== 0) {
      return photos.map((photo, index) => {
        return (
          <ReviewImages photo={photo.url} key={'photos' + index}/>
        );
      })
    } else {
      return <></>
    }
  }

  return (
    <>
      {/* --------------STARS---------------- */}
      {[...Array(5)].map((star, index) => {
        return (
          <span key={index}>{whichStar(example[0].rating, index)}</span>
        );
      })}
      {/* --------------RECOMMENDED?---------------- */}
      {example[0].recommend ? <div>Recommended</div> : <></>}
      <div>{new Date(example[0].date).toLocaleString().split(",")[0]}</div>
      {/* --------------NAME---------------- */}
      <div>{example[0].reviewer_name}</div>
      {/* --------------STARS---------------- */}
      <h2>{example[0].summary}</h2>
      {/* --------------REVIEW BODY---------------- */}
      {tooBig(example[0].body)}
      {/* --------------IS THERE SELLER RESPONSE?---------------- */}
      {example[0].response ?
      <>
      <h4>Response From the Seller: </h4>
      <div>{example[0].response}</div>
      </> : <></>}
      {/* --------------ARE THERE PHOTOS?---------------- */}
      {photosExist(example[0].photos)}
      <span>
      {/* --------------HELPFUL COUNTER---------------- */}
        <div>helpful? {helpfulNum}</div>
        {buttonPressed && <button onClick={() => {
          incrementHelpfulness()
          setButtonPressed(!buttonPressed);}}>+</button>}
      </span>
    </>
  )
}