import React, { useState, useEffect } from 'react';
import All from './components/All';
import ExerciseWall from './components/ExerciseWall';
import Login from './components/Login';
import 'milligram';
import './App.css';

function getStatistics(minutes, picture) {
  if (picture.length < 4) {
    return {
      title: '',
      rewards: { title: '騎士隨從', diamonds: 1 }, 
      progress: `${Math.round(picture.length / 4 * 100)}%`
    }
  } else {
    return minutes / 1950 < 0.6 ? {
        title: '騎士隨從',
        rewards: { title: '見習騎士', diamonds: 2 }, 
        progress: `${Math.round(minutes / 1950 * 100)}%`
      } : {
        title: '見習騎士',
        rewards: { title: '騎士團員', diamonds: 1 }, 
        progress: `${Math.round(minutes / 1950 * 100)}%`
      }
  }
}

function getCardData(data) {
  const integrate = (cardData, { username, strength, minutes, picture }) => {
    const i = cardData.findIndex((card) => card.username === username);
    if (i === -1) {
      cardData.push({ username, totalMinutes: strength === '高強度運動' ? minutes * 2 : minutes, picture: [picture] });
    } else {
      cardData[i].totalMinutes += strength === '高強度運動' ? minutes * 2 : minutes;
      cardData[i].picture.push(picture);
    }
    return cardData;
  };
  const integrateData = data.reduce(integrate, []);
  return integrateData.map(({ username, totalMinutes, picture }) => ({
    username,
    totalMinutes,
    ...getStatistics(totalMinutes, picture)
  }));
}

function getPictureData(data) {
  const sortByTime = (x, y) => new Date(y.timestamp) - new Date(x.timestamp);
  const integrate = (picData, { username, exercise, picture, timestamp }) => {
    const i = picData.findIndex((pic) => pic.timestamp === timestamp.substring(0, 10));
    const picSrc = picture.replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=');
    if (i === -1) {
      picData.push({ username: [username], timestamp: timestamp.substring(0, 10), picture: [picSrc], exercise: [exercise] });
    } else {
      picData[i].username.push(username);
      picData[i].picture.push(picSrc);
      picData[i].exercise.push(exercise);
    }
    return picData;
  };
  return data.reduce(integrate, []).sort(sortByTime);
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [tab, setTab] = useState('all');
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [cardData, setCardData] = useState([]);
  const switchTab = (e) => { setTab(e.target.dataset.tab) };

  useEffect(() => {
    if (data.length > 0) {
      setRecords(getPictureData(data));
      setCardData(getCardData(data));
    }
  }, [data, data.length]);

  return isLogin ? (
    <div className="container">
      <div className="button-group">
        <button data-tab="all" className={`button ${tab === 'all' ? '' : 'button-outline'}`} onClick={switchTab}>總覽</button>
        <button data-tab="wall" className={`button ${tab === 'wall' ? '' : 'button-outline'}`} onClick={switchTab}>運動牆</button>
      </div>
      {tab === 'all' && <All cardData={cardData} />}
      {tab === 'wall' && <ExerciseWall records={records} />}
    </div>
  ) : <Login setIsLogin={setIsLogin} setData={setData} />;
}

export default App;
