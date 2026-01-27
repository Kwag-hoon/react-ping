import React, { useState, useMemo } from 'react';
import DesignItem from "../DesignItem";
import '../styles/archive.scss'
import { Link } from 'react-router-dom';


function Archive() {
  const filters = useMemo(() => ([
    '정보위계',
    '내비게이션 구조',
    '콘텐츠 구조',
    '라벨링',
    '사용자 플로우',
    '피드백/응답',
    '제스처/동작',
    '마이크로 인터렉션',
    '접근성',
    '가독성',
    '오류방지',
    '일관성',
    '레이아웃 / 그리드',
    '타이포그래피',
    '색상 사용',
    '여백/간격',
    '시각적 위계',
  ]), [])

  const items = useMemo(() => {

    // DesignItem상태 변수
    const heights = [240, 320, 420, 520];

    // DesignItem 배열 로직 랜덤이미지 총 100개
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/${i}/800/1200`,
      height: heights[Math.floor(Math.random() * heights.length)],
      title: "네비게이션 간격",
      date: "~2026.02.22",
      views: 21,
      likes: 7,
      comments: 2,

      //카테고리 랜덤 배정
      category: filters[Math.floor(Math.random() * filters.length)],
    }));
  }, [filters]);

  //Archive 필터 상태 변수와 배열값
  const [active, setActive] = useState('정보위계');

  //Tab클릭시 카드이미지 변경 로직
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === active);
  }, [items, active]);

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
            {filters.map((tab) => (
              <li key={tab}>
                <button
                  type='button'
                  aria-pressed={active === tab}
                  className={active === tab ? 'active' : ''}
                  onClick={() => setActive(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>


        <div className="main_recent-archives col-full">
          <div className="gallery-grid">

            {filteredItems.map((item) => (
              <Link to={`/detail/${item.id}`} key={item.id}>
                <DesignItem item={item} />
              </Link>
            ))}

          </div>
        </div>
      </article>
    </section>
  )
}

export default Archive;