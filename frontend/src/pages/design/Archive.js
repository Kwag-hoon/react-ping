import React, { useEffect, useMemo, useState } from 'react';
import DesignItem from "../DesignItem";
import testItems from '../../test/archive.json';
import '../styles/archive.scss'
import { Link } from 'react-router-dom';

function Archive() {
  /**
   * 🔹 하위 카테고리 (DB)
   */
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('전체');

  /**
   * 🔹 현재 단계: 아카이브 게시물 없음
   * (upload / post 완성 후 API 연결 예정)
   */
  // const items = [];
  const [items, setItems] = useState([]); // 린

  //test : json 파일 로딩
  useEffect(()=>{
    setItems(testItems);

    const uniqueCategories = [
      ...new Set(testItems.map(item => item.category))
    ];
    setCategories(uniqueCategories);
  }, [])

  //  카테고리 DB 로딩 
  // useEffect(() => {
  //   fetch('http://localhost:9070/api/categories')
  //     .then(res => res.json())
  //     .then(data => {
  //       // data = { 그룹명: [카테고리들] }
  //       const subs = Object.values(data).flat();
  //       setCategories(subs);
  //     })
  //     .catch(err => console.error('카테고리 로딩 실패:', err));
  // }, []);


  //  필터 적용 (현재는 항상 빈 결과)
  const filteredItems = useMemo(() => {
    if (active === '전체') return items;
    return items.filter(item => item.category === active);
  }, [items, active]);

  // 린_active 변경시마다 서버에서 데이터 가져오기
  // useEffect(()=>{
  //   let url = 'http://localhost:9070/api/archive';

  //   //전체가 아닐때만 category 전달
  //   if(active !=='전체'){
  //     url += `?category=${encodeURIComponent(active)}`;
  //   }

  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     setItems(data);
  //   })
  //   .catch(err => console.error('아카이브 로딩 실패:', err));
  // }, [active]);
  
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

            {categories.map((tab) => (
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
          </div>
        </div>
      </section>
    </main>
  )
}

export default Archive;
