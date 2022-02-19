import React, { useState } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';

export default function StyleSelector () {
  //const[display, changeDisplay] = useState([]);


  //how many rows
  var rows = Math.ceil(stylesData.length / 4);

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
      {[...Array(rows)].map((row, index) => <Row key={`row${index}`} rowData={renderRow(stylesData)}/>)}
      {/* <h4>Select a Size</h4> */}
      <span>
        <form>
          <label for='selectSize'>Select Size </label>
          <select name='selectSize'>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>

          <label for='selectQty'> Select Qty </label>
          <select name='selectQty'>
            <option>1</option>
            <option>2</option>
          </select>
        </form>
      </span>

      <button>Add to Cart</button>


    </>

  );

}