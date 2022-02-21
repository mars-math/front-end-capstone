import React, { useState, useEffect } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';

export default function StyleSelector () {

  const firstStyleId = stylesData[0].style_id;
  const[first, setFirst] = useState(firstStyleId);
  const[display, setDisplay] = useState(stylesData);

  function makeSkusArray(obj) {
    const skusArray = Object.keys(obj).map(
      (sku) => {
        return {
          [sku]: obj[sku],
        };
      },
    );
    return skusArray;
  }

  const[displaySizes, setSizes] = useState(makeSkusArray(display[0].skus));

  const[sizes, setSize] = useState('');


  //how many rows
  var rows = Math.ceil(stylesData.length / 4);
  var startIndex = 0;

  //what data to pass down to each row
  function renderRow(data, rows) {
    if (data.length - startIndex > 4) {
      var toPrint = data.slice(startIndex, startIndex + 4);
      startIndex = startIndex + 4;
      return toPrint;
    } else {
      var remainingToPrint = data.slice(startIndex, data.length);
      return remainingToPrint;
    }

  }

  //puts selected style icon at beginning of style list
  function changeDisplay(first) {
    let copyDisplay = [...display];

    for (var j in copyDisplay) {
      if(copyDisplay[j].style_id.toString() === first) {
        let newFirst = copyDisplay[j];
        copyDisplay.splice(j, 1);
        copyDisplay.unshift(newFirst);
        break;
      }
    }
    setDisplay(copyDisplay);
  }


  //sets first style state to be what's clicked on and changes display and dropdown
  function changeFirst(e) {
    e.preventDefault();
    setFirst(e.target.id);
    changeDisplay(e.target.id);
  }

  //determine what sizes to display in dropdown
  useEffect(() => setSizes(makeSkusArray(display[0].skus)), [display]);

  function selectSize(e) {
    setSize(e.target.value);
  }


  return (
    <>STYLE -> {display[0].name}
      {[...Array(rows)].map((row, index) =>
      <Row
      key={`row${index}`}
      rowData={renderRow(display)}
      rows={rows}
      onClick={changeFirst}
      />)}

      <span>
        <form>
          <label htmlFor='selectSize'></label>
          <select name='selectSize' onChange={(e) => selectSize(e)}>
            <option select='selected'>Select Size</option>

            {displaySizes.map((sku, index) => {
              return <option value={`${sku[Object.keys(sku)[0]].size}`}>{sku[Object.keys(sku)[0]].size}</option>
            })}
          </select>

          <label htmlFor='selectQty'></label>
          <select name='selectQty'>
            <option>Qty</option>
            <option>1</option>
            <option>2</option>
          </select>
        </form>
      </span>

      <button>Add to Cart</button>


    </>

  );

}