import React, { useState } from 'react';

const iconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: 400/2,
  padding: '5px'
}

export default function Row(props) {
  //const[display, changeDisplay] = useState([]);


  //printing out row
  function renderStyles(data, index) {
    if (data.length > 0) {
      let styleToDisplay = data[0].photos[0].thumbnail_url;
      let styleValue = data[0].style_id;
      data.splice(0 , 1);
      return <img style={iconStyle} src={`${styleToDisplay}`} id={styleValue}></img>;
    }
  }

  return (

    <div>
      {[...Array(4)].map((style, index) =>
      <span
      key={`icon-${index}`}
      onClick={(e, data) => props.onClick(e, data)}>
        {renderStyles(props.rowData, index)}
      </span>)}
    </div>



  );
}