import React, { useState } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';

export default function StyleSelector () {
  //const[display, changeDisplay] = useState([]);

  //how many rows
  var renders = Math.ceil(stylesData.length / 4);

  //what data to pass down to each row
  function renderRow(data) {
    if (data.length / 4 > 1) {
      var toPrint = data.slice(0, 4);
      data.splice(0, 4);
      return toPrint;
    } else {
      return data;
    }
  };

  return (
    <>STYLE -> Selected_Style
    {[...Array(renders)].map((row) => <Row rowData={renderRow(stylesData)}/>)}
    </>
  );

}