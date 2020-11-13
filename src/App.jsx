// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import 'milligram';
import All from './components/All';
import ExerciseWall from './components/ExerciseWall';
import './App.css';

const testData = [
  {
    "timestamp": "2020-10-31T09:34:20.072Z",
    "email": "a0282213371@gmail.com",
    "username": "fish_0903",
    "strength": "高強度運動",
    "exercise": "跑步",
    "minutes": 30,
    "picture": "https://drive.google.com/open?id=1sGUMcl3hv3jjlmvEr4cDoGFVtby1ZP25"
  },
  {
    "timestamp": "2020-11-01T09:55:50.441Z",
    "email": "a0282213371@gmail.com",
    "username": "fish_0903",
    "strength": "高強度運動",
    "exercise": "跑步",
    "minutes": 30,
    "picture": "https://drive.google.com/open?id=17E8DWK-z7rBSroQnxSzLmiMyQEDYOs5z"
  },
  {
    "timestamp": "2020-11-03T00:35:30.460Z",
    "email": "sugjijigsu@gmail.com",
    "username": "Jade_TW",
    "strength": "高強度運動",
    "exercise": "晨跑",
    "minutes": 15,
    "picture": "https://drive.google.com/open?id=1qidaUinF07ilNAe7rSBKfQgNMlJ3sY2H"
  },
  {
    "timestamp": "2020-11-03T14:26:06.000Z",
    "email": "yangsyuan8012@gmail.com",
    "username": "Niko_TW",
    "strength": "高強度運動",
    "exercise": "Just Dance",
    "minutes": 60,
    "picture": "https://drive.google.com/open?id=1GTP_2dXm81y_ZCl-dJ-3atvNbOmAMRgs"
  },
  {
    "timestamp": "2020-11-04T01:10:36.282Z",
    "email": "sugjijigsu@gmail.com",
    "username": "Jade_TW",
    "strength": "高強度運動",
    "exercise": "晨跑",
    "minutes": 15,
    "picture": "https://drive.google.com/open?id=1Za-m_Zu0oq6BHsTLcTiZdH9H2MQi1Y3T"
  }
]

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
  return data.reduce(integrate, []);
}

function App() {
  const [tab, setTab] = useState('all');
  const [records, setRecords] = useState([]);
  const [cardData, setCardData] = useState([]);
  const switchTab = (e) => { setTab(e.target.dataset.tab) };
  const getRecords = async () => {
    // const response = await fetch('https://script.google.com/macros/s/AKfycbx5rfuA8VCbSWDpYSnnvEwEFTVojlYDI474WM-ul-xYbJ7V8as/exec');
    // const data = await response.json();
    // setRecords(data);
    setRecords(getPictureData(testData));
    setCardData(getCardData(testData));
  };

  useEffect(() => { getRecords(); }, []);

  return (
    <div className="container">
      <div className="button-group">
        <button data-tab="all" className={`button ${tab === 'all' ? '' : 'button-outline'}`} onClick={switchTab}>總覽</button>
        <button data-tab="wall" className={`button ${tab === 'wall' ? '' : 'button-outline'}`} onClick={switchTab}>運動牆</button>
      </div>
      {tab === 'all' && <All cardData={cardData} />}
      {tab === 'wall' && <ExerciseWall records={records} />}
    </div>
  );
}

export default App;
