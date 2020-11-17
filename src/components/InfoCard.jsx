import React from 'react';
// import { Collapse } from 'react-collapse';
// import Arrow from './Arrow';
import Badge from './Badge';
import chest from '../assets/chest.svg';
import './InfoCard.css';

function InfoCard({ username, totalMinutes, title, rewards, progress }) {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleOpen = () => { setIsOpen(!isOpen); }
  return (
    <div className="column">
      <div className="card">
        <div className="card-header">
          <Badge id={username} />
          <div className="card-username">{`@${username}`}</div>
          {/* <div><span className="card-detail">詳細資訊</span><Arrow direction={isOpen ? 'down' : 'right'} /></div> */}
        </div>
        <div className="card-title-wrap">
          <div>{`${title}`}</div>
          <div className="card-rewards-text">
            {`${rewards.title} & 鑽石 * ${rewards.diamonds}`}
          </div>
        </div>
        <div className="wrapper">
          <div className="progress-bar">
            <span className="progress-bar-fill" style={{ width: progress }}></span>
            <div className="progress-text">{progress}</div>
          </div>
          <img className="progress-chest" src={chest} alt="" />
        </div>
        <div className="card-total-count">
          <span>總計</span><span><b>{` ${totalMinutes} `}</b></span><span>分鐘</span>
        </div>
        {/* <Collapse isOpened={isOpen}>
          <hr />
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed suscipit sapien. Pellentesque lectus lacus, lobortis at ex ac, sodales bibendum nisi. Mauris at risus venenatis, molestie ante sed, commodo leo.</div>
        </Collapse> */}
      </div>
    </div>
  )
}

export default InfoCard;