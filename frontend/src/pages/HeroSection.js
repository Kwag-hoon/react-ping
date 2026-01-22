import React from 'react';

function HeroSection(props) {
  return (
    <article className="main_hero-section container">
      <div className="grid">

        <div className="top-text col-8">
          <h2>핀으로 더 정확해진 디자인 피드백</h2>
          <p>문제 되는 지점을 핀으로 찍고</p>
          <p>위치기반 피드백으로 더 빠르게 개선하세요.</p>
        </div>

        <img
          className="hero-image col-4"
          src={process.env.PUBLIC_URL + '/images/hero_image.png'}
          alt=""
        />

        <div className="hero-btns col-4">
          <button className='achive-btn'>아카이브 시작하기</button>
          <button className='sample-btn'>샘플보기</button>
        </div>
      </div>

    </article>
  );
}

export default HeroSection;