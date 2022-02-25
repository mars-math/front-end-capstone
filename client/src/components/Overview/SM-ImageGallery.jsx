import React, { useState, useEffect } from 'react';
import Share from './SM-Share.jsx';

const thumbnailStyle = {
  height: '50px',
  width: '50px',
}

// const dimensions = Dimensions.get('window');
// const mainHeight = dimensions.height;
// const mainWidth = Math.round(dimensions.width * 9 / 16);

const mainStyle = {
  flex: 0.5,
  objectFit: 'contain',
  // aspectRatio: 2/3
  height: '450px',
  width: '300px'
}



export default function ImageGallery(props) {
  // const initialData = stylesData[0].photos.
  function initialData(data) {
    data[0].border = true;
    for (var i = 1; i < data.length; i++) {
      data[i].border = false
    }
    return data;
  }

  const [thumbnails, setThumbs] = useState(initialData(props.photos));
  const [mainIndex, setMainIndex] = useState(0);
  const [mainPopUp, setMainPopUp] = useState(false);

  function changeMainIndex(newIndex) {
    setMainIndex(newIndex);
  }

  //updates main pic when style changes from style selector
  useEffect(() => {
    setThumbs(props.photos);
    setMainIndex(0);
  }, [props.photos]);


  function toggleMainPopUp() {
    setMainPopUp(!mainPopUp);
  }


  return (
    <>
      <div className='images'>
        <span className='thumbnails'>
          {thumbnails.slice(0, 7).map((photo, index) =>
            <img
              className={
                index === mainIndex ? 'withBorder' : 'noBorder'}
              key={`thumb-${index}`}
              style={thumbnailStyle}
              src={photo.thumbnail_url}
              onClick={() => changeMainIndex(index)} />
          )}
        </span>

        <img style={mainStyle}
          src={thumbnails[mainIndex].thumbnail_url} className='picture'
          onClick={toggleMainPopUp} />

        {mainPopUp && (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={toggleMainPopUp}>x</span>
              <img src={thumbnails[mainIndex].thumbnail_url} />
            </div>
          </div>
        )}
      </div>


      {/* <div style={{inlineSize: '350px', overflowWrap: 'break-word'}}>{productData[0].description}</div> */}
    </>
  );

}