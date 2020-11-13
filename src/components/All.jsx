import React from 'react';
import InfoCard from './InfoCard';

function All({ cardData }) {
  return (
    <div className="row">
      {cardData.map((card) => <InfoCard key={card.username} {...card}></InfoCard>)}
      {/* <InfoCard username={'Niko_TW'} totalMinutes={1960} title={''} rewards={{ title: '未來的稱號', diamonds: 4 }} progress="70%"/>
      <InfoCard username={'Jade_TW'} totalMinutes={1960} title={'目前的稱號'} rewards={{ title: '', diamonds: 5 }} progress="50%"/>
      <InfoCard username={'fish_0903'} totalMinutes={2060} title={''} rewards={{ title: '未來的稱號', diamonds: 6 }} progress="30%"/> */}
    </div>
  );
}

export default All;