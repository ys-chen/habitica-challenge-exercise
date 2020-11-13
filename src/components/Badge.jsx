import React from 'react';
// import warrior from '../assets/warrior.png';
import mage from '../assets/mage.png';
import healer from '../assets/healer.png';
import rogue from '../assets/rogue.png';
import './Badge.css';

function Badge({ id }) {
  const idList = {
    'Niko_TW': rogue,
    'Jade_TW': mage,
    'fish_0903': healer
  };
  return <img className="badge" src={idList[id]} alt="class badge" />;
}

export default Badge;