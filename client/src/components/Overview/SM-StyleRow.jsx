import React, { useState } from 'react';

export default function Row(props) {
  //const[display, changeDisplay] = useState([]);

  //printing out row
  function renderStyles(data) {
    if (data.length > 0) {
      let styleToDisplay = data[0];
      data.splice(0 , 1);
      return styleToDisplay;
    }
  }

  return (
    <div>
      {[...Array(4)].map((style, index) => <span className='btn btn-primary'>{renderStyles(props.rowData)}</span>)}
    </div>
  );
}