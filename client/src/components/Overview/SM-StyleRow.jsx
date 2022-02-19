import React, { useState } from 'react';

export default function Row(props) {
  //const[display, changeDisplay] = useState([]);

  // const iconStyle = {
  //   width: '50px',
  //   height: '50px'
  // }

  //printing out row
  function renderStyles(data) {
    if (data.length > 0) {
      let styleToDisplay = data[0].photos[0].thumbnail_url;
      data.splice(0 , 1);
      return <img style={{width:'50px', height: '50px'}} src={`${styleToDisplay}`} ></img>;
    }
  }

  return (

    <div>
      {[...Array(4)].map((style, index) => <span key={`icon-${index}`} >{renderStyles(props.rowData)}</span>)}
    </div>



  );
}