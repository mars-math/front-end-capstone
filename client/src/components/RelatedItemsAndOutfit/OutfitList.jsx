/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import CardCarousel from './CardCarousel.jsx';

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

  const removeProduct = (e) => {
    const currentOutfits = JSON.parse(window.localStorage.getItem('allOutfits'));
    window.localStorage.removeItem(e.target.dataset.id);
    // I will need to capture the ID from the event and use that to remove
    currentOutfits.splice(currentOutfits.indexOf(e.target.dataset.id), 1);
    window.localStorage.setItem('allOutfits', JSON.stringify(currentOutfits));
    setOutfitIds(currentOutfits);
    // console.log(e.target.dataset.id);

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
    <div data-testid="allOutfit">
      <div style={{ display: 'flex', marginLeft: '15%' }}>
        <h2>My Outfit</h2>
        <button type="button" onClick={addToOutfit} style={{ fontWeight: 'bold', marginLeft: '20px' }}>Add to Outfit</button>
      </div>
      {/* <button type="button" onClick={clearOutfit}>Remove all items from My Outfit</button> */}
      <CardCarousel overviewId={overviewId} idsToRender={outfitIds} isOutfitList removeProduct={removeProduct} addToOutfit={addToOutfit} />
    </div>
  );
}

export default OutfitList;
