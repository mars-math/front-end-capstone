import React, { useState } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';

export default function StyleSelector () {

  const firstStyleId = stylesData[0].style_id;
  const[first, setFirst] = useState(firstStyleId);
  const[display, setDisplay] = useState(stylesData);
  var copyStylesData = display.slice(0, display.length);


  //how many rows
  var rows = Math.ceil(copyStylesData.length / 4);

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

  function changeFirst(e) {
    e.preventDefault();
    setFirst(e.target.id);
    console.log(first);
  }

  // function changeDisplay(first) {
  //   setDisplay((prev) => {
  //     prev.splice(prev.indexOf(first), 1);
  //     prev.shift(first);
  //   })
  // }

  return (
    <>STYLE -> Selected_Style
      {[...Array(rows)].map((row, index) =>
      <Row
      key={`row${index}`}
      rowData={renderRow(copyStylesData)}
      onClick={changeFirst}
      />)}

      <span>
        <form>
          <label htmlFor='selectSize'>Select Size </label>
          <select name='selectSize'>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>

          <label htmlFor='selectQty'> Select Qty </label>
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