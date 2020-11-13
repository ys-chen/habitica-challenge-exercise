import React, { useState } from 'react';
import Loading from './Loading'
import './ExerciseWall.css';

function Img({ src, exercise }) {
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const hideLoading = () => { setIsLoading(false); };
  return (
    <div className="exercise-image-wrap card" key={src}>
      {isLoading && <Loading />}
      <img className={isLoading ? `exercise-image-hide` : ''} src={src} alt={exercise} onLoad={hideLoading} />
      <div className="exercise-image-text">{`#${exercise}`}</div>
    </div>
  )
}

function ExerciseWall({ records }) {
  return records.map(({ timestamp, exercise, picture }) => (
    <div key={timestamp}>
      <div className="timestamp-wrap">
        <h3 className="timestamp-text">{timestamp}</h3>
        <div className="timestamp-deco"></div>
      </div>
      <div className="exercise-image-block">
        {picture.map((src, i) => <Img src={src} exercise={exercise[i]} key={src} />)}
      </div>
    </div>
  ));
}

export default ExerciseWall;