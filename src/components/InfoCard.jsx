import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import Badge from './Badge';
import './InfoCard.css';

function InfoCard({ username, totalMinutes, title, rewards, progress }) {
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollapse = () => { setIsCollapse(!isCollapse); }
  return (
    <div className="column">
      <div className="card" onClick={toggleCollapse}>
        <div className="card-header">
          <Badge id={username} />
          <div className="card-username">{`@${username}`}</div>
          <div>{'詳細資訊 >'}</div>
        </div>

        <div className="card-title-wrap">
          <div>{`${title}`}</div>
          <div>
            {`${rewards.title} & 鑽石 * ${rewards.diamonds}`}
          </div>
        </div>
        <div className="wrapper">
          <div className="progress-bar">
            <span className="progress-bar-fill" style={{ width: progress }}></span>
            <div className="progress-text">{progress}</div>
          </div>
        </div>
        <div className="card-total-count">
          <span>總計</span><span><b>{` ${totalMinutes} `}</b></span><span>分鐘</span>
        </div>
        <Collapse isOpened={isCollapse}>
          <hr />
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed suscipit sapien. Pellentesque lectus lacus, lobortis at ex ac, sodales bibendum nisi. Mauris at risus venenatis, molestie ante sed, commodo leo.</div>
        </Collapse>
      </div>
    </div>
  )
}

export default InfoCard;