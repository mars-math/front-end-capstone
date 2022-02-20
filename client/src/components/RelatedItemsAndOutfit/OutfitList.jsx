/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';

function OutfitList(props) {
  const { overviewId } = props;
  const [outfitIds, setOutfitIds] = useState([]);

  // // FOR TESTING LOCAL STORAGE FUNCTIONS WITH DUMMY DATA:
  // const [addId, setAddId] = useState(overviewId);
  // const [removalId, setRemovalId] = useState((Number(overviewId) - 1).toString());

  const addToOutfit = () => {
    if (window.localStorage.key('allOutfits') === null) {
      window.localStorage.setItem('allOutfits', JSON.stringify(outfitIds));
    }
    if (window.localStorage.getItem(overviewId) === null) {
      const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
      window.localStorage.setItem(overviewId, overviewId);
      const newOutfits = currentOutfits.concat(overviewId);
      window.localStorage.setItem('allOutfits', JSON.stringify(newOutfits));
      setOutfitIds(newOutfits);
    }

    // // FOR TESTING LOCAL STORAGE FUNCTIONS WITH DUMMY DATA:
    // if (window.localStorage.getItem(addId) === null) {
    //   const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
    //   window.localStorage.setItem(addId, addId);
    //   const newOutfits = currentOutfits.concat(addId);
    //   window.localStorage.setItem('allOutfits', JSON.stringify(newOutfits));
    //   setOutfitIds(newOutfits);
    // }

    // const newAddNum = Number(addId) + 1;
    // const newRemoveNum = Number(removalId) + 1;
    // setAddId(newAddNum.toString());
    // setRemovalId(newRemoveNum.toString());
  };

  const removeProduct = () => {
    const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
    window.localStorage.removeItem('42368'); // I will need to capture the ID from the event and use that to remove
    currentOutfits.splice(currentOutfits.indexOf('42368'), 1);
    window.localStorage.setItem('allOutfits', JSON.stringify(currentOutfits));
    setOutfitIds(currentOutfits);

    // // FOR TESTING LOCAL STORAGE FUNCTIONS WITH DUMMY DATA:
    // if (window.localStorage.getItem(removalId) !== null) {
    //   const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
    //   window.localStorage.removeItem(removalId);
    //   currentOutfits.splice(currentOutfits.indexOf(removalId), 1);
    //   window.localStorage.setItem('allOutfits', JSON.stringify(currentOutfits));
    //   setOutfitIds(currentOutfits);

    //   const newAddNum = Number(addId) - 1;
    //   const newRemoveNum = Number(removalId) - 1;
    //   setAddId(newAddNum.toString());
    //   setRemovalId(newRemoveNum.toString());
    // }
  };

  const clearOutfit = () => {
    window.localStorage.clear();
    setOutfitIds([]);
  };

  useEffect(() => {
    if (window.localStorage.getItem('allOutfits') === null) {
      setOutfitIds([]);
    } else {
      const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
      setOutfitIds(currentOutfits);
    }
  }, []);

  return (
    <>
      <h3>My Outfit</h3>
      {/* the button to add item to outfit; will probably need to pass in the currently rendered id as a prop */}
      <button type="button" onClick={addToOutfit}>Add to My Outfit</button>
      <button type="button" onClick={removeProduct}>Remove from My Outfit</button>
      <button type="button" onClick={clearOutfit}>Remove all items from My Outfit</button>
      <Carousel idsToRender={outfitIds} isOutfitList />
    </>
  );
}

export default OutfitList;
