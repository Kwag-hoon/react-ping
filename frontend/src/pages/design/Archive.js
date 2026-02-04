import React, { useEffect, useMemo, useState } from 'react';
import DesignItem from "../DesignItem";
import '../styles/archive.scss';

function Archive() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('전체');
  const [items, setItems] = useState([]);

  /* ===============================
     카테고리 로딩 (UI용)
     =============================== */
  useEffect(() => {
    fetch('http://localhost:9070/api/categories')
      .then(res => res.json())
      .then(data => {
        const subs = Object.values(data).flat();
        setCategories(subs);
      })
      .catch(err => console.error('카테고리 로딩 실패:', err));
  }, []);

  /* ===============================
     게시물 로딩 함수
     =============================== */
  const fetchPosts = () => {
    fetch('http://localhost:9070/api/posts')
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('아카이브 로딩 실패:', err));
  };

  /* 최초 로딩 */
  useEffect(() => {
    fetchPosts();
  }, []);

  /* 🔥 포커스 돌아올 때 다시 로딩 */
  useEffect(() => {
    const handleFocus = () => {
      fetchPosts();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  /* ===============================
     필터 + 중복 제거
     =============================== */
  const displayItems = useMemo(() => {
    const filtered =
      active === '전체'
        ? items
        : items.filter(item => item.subType === active);

    const map = new Map();

    filtered.forEach(item => {
      if (map.has(item.id)) return;

      map.set(item.id, {
        id: item.id,
        title: item.title,
        image: `http://localhost:9070${item.imagePath}`,
        date: item.createdAt,

        // 🔑 DesignItem 기준 필드명
        view_count: item.viewCount ?? item.view_count ?? 0,
        question_count: item.pins ?? 0,
      });
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
                className={active === '전체' ? 'active' : ''}
                onClick={() => setActive('전체')}
              >
                전체
              </button>
            </li>

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
          <div className="gallery-grid">
            {displayItems.length > 0 ? (
              displayItems.map(item => (
                <DesignItem key={item.id} item={item} />
              ))
            ) : (
              <p className="empty">아카이브가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Archive;
