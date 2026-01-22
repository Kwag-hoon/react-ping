import React, { useState, useMemo } from 'react';
import DesignItem from "../DesignItem";
import '../styles/archive.scss'


function Archive() {
  const items = useMemo(() => {

    const heights = [240, 320, 420, 520];

    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/${i}/800/1200`,
      height: heights[Math.floor(Math.random() * heights.length)],
      title: "네비게이션 간격",
      date: "~2026.02.22",
      views: 21,
      likes: 7,
      comments: 2,
    }));
  }, []);

  return (
    <section className='archive container'>
      <article className='grid'>
        <div className="top-text col-5">
          <h2>아카이브</h2>
          <p>디자인 문제를 중심으로 커뮤니티의 질문과 피드백을 탐색하세요.</p>
        </div>

        <div className='filters col-full'>
          <span>FILTERS</span>
          <ul className="archive-navi">
            <li>정보위계</li>
            <li>내비게이션 구조</li>
            <li>콘텐츠 구조</li>
            <li>라벨링</li>
            <li>사용자 플로우</li>
            <li>피드백/응답</li>
            <li>제스처/동작</li>
            <li>마이크로 인터렉션</li>
            <li>접근성</li>
            <li>가독성</li>
            <li>오류방지</li>
            <li>일관성</li>
            <li>레이아웃 / 그리드</li>
            <li>타이포그래피</li>
            <li>색상 사용</li>
            <li>여백/간격</li>
            <li>시각적 위계</li>
          </ul>
        </div>
      </article>

      <article className="main_recent-archives container">
        <div className="gallery-masonry">
          {items.map((item) => (
            <DesignItem key={item.id} item={item} />
          ))}
        </div>
      </article>
    </section>
  )
}

export default Archive;