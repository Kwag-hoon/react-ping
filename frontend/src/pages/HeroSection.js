import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection(props) {
  return (
    <article className="main_hero-section container">
      <div className="grid">
        <div className="col-12">
          <div className="top-text">
            <h2>핀으로 더 정확해진 <span class="tab-br"></span>디자인 피드백</h2>
            <p>문제 되는 지점을 핀으로 찍고</p>
            <p>위치기반 피드백으로 <span class="tab-br"></span>더 빠르게 개선하세요.</p>
          </div>
          <img
            className="hero-image "
            src={process.env.PUBLIC_URL + '/images/hero_image.png'}
            alt=""
          />
        </div><div className="hero-btns col-4">
          <Link to="/archive" className="achive-btn">
            아카이브 시작하기
          </Link>

          <button className="sample-btn">
            샘플보기
          </button>
        </div>

      </div>

    </article>
  );
}

export default HeroSection;