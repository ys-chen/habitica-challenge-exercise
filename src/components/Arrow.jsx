import React from 'react';
import './Arrow.css';

function Arrow({ direction }) {
  return <i className={`arrow ${direction}`}></i>
}

export default Arrow;