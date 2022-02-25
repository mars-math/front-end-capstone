import React, { useState, useEffect } from 'react';
import ImageGallery from './SM-ImageGallery.jsx';

export default function StyleSelector(props) {
  //converting one of states to array
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
  //states
  const[display, setDisplay] = useState(props.stylesData);
  const[selected, setSelected] = useState(0);
  const[displaySizes, setSizes] = useState(makeSkusArray(display[selected].skus));
  const[displayQtys, setQtys] = useState('select size');
  const[sizeAndSku, setSize] = useState({});
  const[originalPrice, setOgPrice] = useState(display[selected].original_price);
  const[salePrice, setSalePrice] = useState(display[selected].sale_price);
  const[button, setButton] = useState('ADD TO CART')

  //how many rows
  var rows = Math.ceil(display.length / 4);
  var startIndex = 0;

  //whether icon has border
  function selectedStyle(index) {
    if (index === selected ) {
      const selectedStyle = {
        border: '2px solid rgb(146, 130, 85)',
        padding: '5px'
      }
      return selectedStyle;
    } else {
      return {
        padding: '5px'
      };
   }
  }

  //sets first style state to be what's clicked on and changes display and dropdown
  function changeFirst(e, index) {
    e.preventDefault();
    setSelected(index);
  }


  //determine what sizes to display in dropdown
  useEffect(() => setSizes(makeSkusArray(display[selected].skus)), [display]);

  function findSizeQty(array) {
    for (var entry of array) {
      if (Object.keys(entry)[0] === Object.keys(sizeAndSku)[0]) {
        if (Object.values(entry)[0].quantity <= 15) {
          return Object.values(entry)[0].quantity;
        } else if (Object.values(entry)[0].quantity > 15) {
          return 15;
        }

      }
    }
    return 0;
  }


  //change qty dropdown when different sku selected
  useEffect(() => setQtys(findSizeQty(displaySizes)), [sizeAndSku]);

  function selectSize(e) {
    setSize(JSON.parse(e.target.value));
  }

  //re-render prices
  useEffect(() => {
    setOgPrice(display[selected].original_price);
    setSalePrice(display[selected].sale_price);
  }, [selected]);


  //what prices to display
  function priceDisplay(sale, original) {
    if (sale) {
      return (
      <>
        <div>${salePrice}</div>
        <div style={{textDecorationLine: 'line-through', color: 'rgb( 150, 65, 31)', textDecorationStyle: 'solid', marginLeft: '10px'}}>${originalPrice}</div>
      </>);

    } else {
      return <div>${originalPrice}</div>;

    }
  }

  function changeCart(e) {
    e.preventDefault();
    setButton('WOO! ADDED');
    setTimeout(() => {
      setButton('ADD TO CART');
  }, 1000);
  }


  return (
    <>
    <div className='styles-container'>
    {/* ------Price and Style Name------ */}
    <div className='prices'>{priceDisplay(salePrice, originalPrice)}</div>
    <div>{display[selected].name}</div>

    {/* -----Rendering Style Icons----- */}
    <div className='parent'>
      {display.map((row, index) =>
      <img
      className='child'
      key={`row${index}`}
      onClick={(e) => changeFirst(e, index)}
      style={selectedStyle(index)}
      src={row.photos[0].thumbnail_url}
      ></img>)}
    </div>

      {/* --------DropDown Lists-------- */}
      <span>
        {/* <form> */}
          {/* <label htmlFor='selectSize'></label> */}
          <select name='selectSize'
          className='dropdown'
          onChange={(e) => selectSize(e)}>
            <option>Select Size</option>
            {[...displaySizes].map((sku, index) => {
              var skuId = Object.keys(sku);
              var size = sku[Object.keys(sku)[0]].size;
              return <option
              key={`size-${index}`}
              value={`${JSON.stringify({
                [skuId]: size,
              })}`}>{size}</option>
            })}
          </select>

          {/* <label htmlFor='selectQty'></label> */}
          <select name='selectQty'
          className='dropdown'>
            <option value=''>-</option>
            {[...Array(displayQtys)].map((element, index) =>
              <option
              key={`qty-${index}`}>{index + 1}
              </option>
            )}
          </select>
        {/* </form> */}
      </span>

        {/* --------Add to Cart Button------- */}
        <button className='cust-button' onClick={changeCart}>{button}</button>
      </div>

      {/* ---Main Image and Thumbnails--- */}
      <div className='image-gallery'>
        <ImageGallery photos={display[selected].photos}/>
      </div>

    </>

  );

}

// import React, { useState, useEffect } from 'react';
// import Row from './SM-StyleRow.jsx';
// import ImageGallery from './SM-ImageGallery.jsx'
// import stylesData from './SM-dummystylesdata.js';

// export default function StyleSelector(props) {

//   const[display, setDisplay] = useState(stylesData);
//   const[first, setFirst] = useState('');

//   function makeSkusArray(obj) {
//     const skusArray = Object.keys(obj).map(
//       (sku) => {
//         return {
//           [sku]: obj[sku],
//         };
//       },
//     );
//     return skusArray;
//   }

//   const[displaySizes, setSizes] = useState(makeSkusArray(display[0].skus));
//   const[displayQtys, setQtys] = useState('select size');
//   const[sizeAndSku, setSize] = useState({});


//   //how many rows
//   var rows = Math.ceil(stylesData.length / 4);
//   var startIndex = 0;

//   //what data to pass down to each row
//   function renderRow(data, rows) {
//     if (data.length - startIndex > 4) {
//       var toPrint = data.slice(startIndex, startIndex + 4);
//       startIndex = startIndex + 4;
//       return toPrint;
//     } else {
//       var remainingToPrint = data.slice(startIndex, data.length);
//       return remainingToPrint;
//     }

//   }

//   //puts selected style icon at beginning of style list
//   function changeDisplay(first) {
//     let copyDisplay = [...display];

//     for (var j in copyDisplay) {
//       if(copyDisplay[j].style_id.toString() === first) {
//         let newFirst = copyDisplay[j];
//         copyDisplay.splice(j, 1);
//         copyDisplay.unshift(newFirst);
//         break;
//       }
//     }
//     setDisplay(copyDisplay);
//   }


//   //sets first style state to be what's clicked on and changes display and dropdown
//   function changeFirst(e) {
//     e.preventDefault();
//     setFirst(e.target.id);
//     changeDisplay(e.target.id);
//   }

//   //determine what sizes to display in dropdown
//   useEffect(() => setSizes(makeSkusArray(display[0].skus)), [display]);

//   function findSizeQty(array) {
//     for (var entry of array) {
//       if (Object.keys(entry)[0] === Object.keys(sizeAndSku)[0]) {
//         if (Object.values(entry)[0].quantity <= 15) {
//           return Object.values(entry)[0].quantity;
//         } else if (Object.values(entry)[0].quantity > 15) {
//           return 15;
//         }

//       }
//     }
//     return 0;
//   }


//   //change qty dropdown when different sku selected
//   useEffect(() => setQtys(findSizeQty(displaySizes)), [sizeAndSku]);

//   function selectSize(e) {
//     setSize(JSON.parse(e.target.value));
//   }


//   return (
//     <>

//     {/* -----Rendering Style Icons----- */}
//     <div className='styles-container'>
//       {[...Array(rows)].map((row, index) =>
//       <Row
//       key={`row${index}`}
//       rowData={renderRow(display)}
//       rows={rows}
//       onClick={changeFirst}
//       />)}

//       {/* --------DropDown Lists-------- */}
//       <span>
//         <form>
//           <label htmlFor='selectSize'></label>
//           <select name='selectSize' onChange={(e) => selectSize(e)}>
//             <option>Select Size</option>
//             {[...displaySizes].map((sku, index) => {
//               var skuId = Object.keys(sku);
//               var size = sku[Object.keys(sku)[0]].size;
//               return <option
//               key={`size-${index}`}
//               value={`${JSON.stringify({
//                 [skuId]: size,
//               })}`}>{size}</option>
//             })}
//           </select>

//           <label htmlFor='selectQty'></label>
//           <select name='selectQty'>
//             <option value='' selected disabled hidden>-</option>
//             {[...Array(displayQtys)].map((element, index) =>
//               <option
//               key={`qty-${index}`}>{index + 1}
//               </option>
//             )}
//           </select>
//         </form>
//       </span>

//         {/* --------Add to Cart Button------- */}
//         <button>Add to Cart</button>
//       </div>

//       {/* ---Main Image and Thumbnails--- */}
//       <div className='image-gallery'>
//         <ImageGallery />
//       </div>

//     </>

//   );

// }