import React, { useEffect, useMemo, useState } from 'react';
import DesignItem from "../DesignItem";
// import testItems from '../../test/archive.json';
import '../styles/archive.scss'
import { Link } from 'react-router-dom';

function Archive() {

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('전체');
  const [items, setItems] = useState([]);


  //  카테고리 DB 로딩 (UI 용)
  useEffect(() => {
    fetch('http://localhost:9070/api/categories')
      .then(res => res.json())
      .then(data => {
        // data = { 그룹명: [카테고리들] }
        const subs = Object.values(data).flat();
        setCategories(subs);
      })
      .catch(err => console.error('카테고리 로딩 실패:', err));
  }, []);

  // 게시물 로딩 
  useEffect(() => {
    fetch('http://localhost:9070/api/posts')
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('아카이브 로딩 실패:', err));
  }, []);

  //  필터 적용
  const displayItems = useMemo(() => {
    // 1) 먼저 필터 적용
    const filtered =
      active === '전체'
        ? items
        : items.filter(item => item.subType === active);

    // 2) 그 다음 필터된 결과에서만 중복 제거
    const map = new Map();
    filtered.forEach(item => {
      if (!map.has(item.id)) map.set(item.id, item);
    });

    return Array.from(map.values());
  }, [items, active]);

  return (
    <main className='archive container'>
      <section className='grid'>
        <div className="top-text col-12">
          <h2>아카이브</h2>
          <p>디자인 문제를 중심으로 커뮤니티의 질문과 피드백을 탐색하세요.</p>
        </div>

        <div className='filters col-full'>
          <span>FILTERS</span>
          <ul className="archive-navi">
            <li>
              <button
                type="button"
                aria-pressed={active === '전체'}
                className={active === '전체' ? 'active' : ''}
                onClick={() => setActive('전체')}
              >
                전체
              </button>
            </li>

            {/* {categories.map((tab) => (
              <li key={tab}>
                <button
                  type='button'
                  aria-pressed={active === tab}
                  className={active === tab ? 'active' : ''}
                  onClick={() => setActive(tab)}
                >*/}
            {categories.map(name => (
              <li key={name}>
                <button
                  className={active === name ? 'active' : ''}
                  onClick={() => setActive(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="main_recent-archives col-full">
          {/* <div className="gallery-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <DesignItem item={{
                    title: item.post_title,
                    image: item.image_path,
                    date: item.create_datetime
                  }} />
                </Link>
              ))
            ) : (
              <p className="empty">아카이브가 없습니다.</p>
            )}
          </div> */}
          <div className="gallery-grid">
            {displayItems.length > 0 ? (
              displayItems.map(item => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <DesignItem
                    item={{
                      title: item.title,
                      image: `http://localhost:9070${item.imagePath}`,
                      date: item.createdAt,
                      pins: item.pins
                    }}
                  />
                </Link>
              ))
            ) : (
              <p className="empty">아카이브가 없습니다.</p>
            )}
          </div>

        </div>
      </section>
    </main>
  )
}

export default Archive;
