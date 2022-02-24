import React, { useState, useEffect } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';
import productData from './SM-dummyproductdata.js';

const thumbnailStyle = {
  height: '50px',
  width: '50px',
}

// const dimensions = Dimensions.get('window');
// const mainHeight = dimensions.height;
// const mainWidth = Math.round(dimensions.width * 9 / 16);

const mainStyle = {
  flex: 0.5
  // aspectRatio: 2/3
  // height: '100%',
  // width: '50%'
}



export default function ImageGallery(props) {
  // const initialData = stylesData[0].photos.
  function initialData (data) {
      data[0].border = true;
    for (var i = 1; i < data.length; i++) {
      data[i].border = false
    }
    return data;
  }

  const[thumbnails, setThumbs] = useState(initialData(props.photos));
  const[mainSrc, setMainSrc] = useState(thumbnails[0].thumbnail_url);
  const[mainPopUp, setMainPopUp] = useState(false);

  function changeMainSrc(url) {
    console.log(url)
    setMainSrc(url);
  }

  //updates main pic when style changes from style selector
  useEffect(() => {
    setThumbs(props.photos);
    setMainSrc(thumbnails[0].thumbnail_url);
  }, [props.photos]);

  //updates thumnails list when main pic changes
  useEffect(() => {
    setMainSrc(thumbnails[0].thumbnail_url);
  }, [thumbnails]);

  //add border key to thumbnails
  // useEffect(() => {
  //   const copyThumbs = [...thumbnails];
  //   for(var entry of copyThumbs) {
  //     if (entry.thumbnail_url === mainSrc) {
  //       entry.border = true;
  //     } else {
  //       entry.border = false;
  //     }
  //   }
  //   setThumbs(copyThumbs);
  // } , [mainSrc]);

  function toggleMainPopUp() {
    setMainPopUp(!mainPopUp);
  }


  return (
    <>
      <div className='images'>
        <span className='thumbnails'>
          {thumbnails.slice(0, 7).map((photo, index)=>
            <img
            className={thumbnails[index].border ? 'withBorder' : 'noBorder'}
            key={`thumb-${index}`}
            style={thumbnailStyle}
            src={photo.thumbnail_url}
            onClick={() => changeMainSrc(photo.thumbnail_url)}/>
          )}
          <button>down</button>
        </span>

        <img style={mainStyle} src={mainSrc} className='picture' onClick={toggleMainPopUp}/>

        {mainPopUp && (
          <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={toggleMainPopUp}>x</span>
            <img src={mainSrc} />
          </div>
        </div>
        )}
      </div>

      {/* <div style={{inlineSize: '350px', overflowWrap: 'break-word'}}>{productData[0].description}</div> */}
    </>
  );

}