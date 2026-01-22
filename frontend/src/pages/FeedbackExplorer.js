import React, { useEffect, useMemo, useState } from 'react';
import FeedbackCard from './FeedbackCard';
import arrow from "../assets/arrow_right.svg";

const CATEGORY_DATA = {
  '정보구조': ['정보 위계', '내비게이션 구조', '컨텐츠 조직', '라벨링/명명'],
  '인터렉션': ['사용자 플로우', '피드백/응답', '제스터/동작', '마이크로 인터랙션'],
  '사용성': ['접근성', '가독성', '오류 방지', '일관성'],
  '비주얼 디자인': ['레이아웃/그리드', '타이포그래피', '색상사용', '여백/간격', '시각적 위계']
};

const FEEDBACKS = [
  { id: 'ia-1', mainType: '정보구조', subType: '정보 위계', description: '프라이머리 액션이 시각적으로 경쟁함', pins: 4, daysAgo: '2일전' },
  { id: 'us-1', mainType: '사용성', subType: '가독성', description: '본문 텍스트와 배경색의 대비가 낮음', pins: 12, daysAgo: '3일전' },
  { id: 'vd-1', mainType: '비주얼 디자인', subType: '색상사용', description: '색상 체계가 기능별로 일관되지 않음', pins: 12, daysAgo: '3일전' },
  { id: 'vd-2', mainType: '비주얼 디자인', subType: '시각적 위계', description: '중요 정보가 강조되지 않아 흐름이 분산됨', pins: 7, daysAgo: '1일전' },
  { id: 'vd-3', mainType: '비주얼 디자인', subType: '타이포그래피', description: '타이틀/본문 간 위계 차이가 부족함', pins: 9, daysAgo: '5일전' },
  { id: 'vd-4', mainType: '비주얼 디자인', subType: '레이아웃/그리드', description: '정렬 기준이 흔들려 카드 간 리듬이 깨짐', pins: 6, daysAgo: '4일전' },
];
const PAGE_SIZE = 4;
function FeedbackExplorer() {
  const [activeMain, setActiveMain] = useState('전체');
  const [activeSub, setActiveSub] = useState('전체');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleMainClick = (main) => {
    setActiveMain(main);
    setActiveSub('전체');
  };

  const filteredFeedbacks = useMemo(() => {
    return FEEDBACKS.filter((fb) => {
      const mainMatch = activeMain === '전체' || fb.mainType === activeMain;
      const subMatch = activeSub === '전체' || fb.subType === activeSub;
      return mainMatch && subMatch;
    });
  }, [activeMain, activeSub]);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeMain, activeSub]);
  const visibleFeedbacks = useMemo(() => {
    return filteredFeedbacks.slice(0, visibleCount);
  }, [filteredFeedbacks, visibleCount]);

  const canLoadMore = visibleCount < filteredFeedbacks.length;

  return (
    <section className="main_feedback-explorer container">
      <div className="grid">
        <aside className="explorer_aside col-4">
          <h2>문제 유형별 탐색</h2>
          <p>카테고리 별 피드백 아카이브를 확인해 보세요.</p>

          <ul className="menu_list">
            {Object.entries(CATEGORY_DATA).map(([main, subs]) => {
              const isOpen = activeMain === main;

              return (
                <li key={main} className={`main_item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className={`menu_btn ${isOpen ? 'is-active' : ''}`}
                    onClick={() => handleMainClick(main)}
                  >
                    {main}

                    {isOpen && (
                      <img
                        src={arrow} alt="arrow" className="menu_arrow"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="active_panel">
                      <div className="active_panel_head">
                      </div>
                      <div className="chip_row">
                        <button
                          type="button"
                          className={`chip ${activeSub === '전체' ? 'is-active' : ''}`}
                          onClick={() => setActiveSub('전체')}
                        >
                          전체  {activeSub === "전체" && (
                            <img src={arrow} alt="arrow" className="chip_arrow" />
                          )}
                        </button>
                        {subs.map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            className={`chip ${activeSub === sub ? 'is-active' : ''}`}
                            onClick={() => setActiveSub(sub)}
                          >
                            {sub}

                            {activeSub === sub && (
                              <img src={arrow} alt="arrow" className="chip_arrow" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

        </aside>

        <div className="feedbackcons col-8">
          <div className="cards">
            {visibleFeedbacks.length > 0 ? (
              visibleFeedbacks.map((fb) => <FeedbackCard key={fb.id} data={fb} />)
            ) : (
              <p className="empty">데이터가 없습니다.</p>
            )}
          </div>
          {canLoadMore && (
            <div className="more_wrap">
              <button
                type="button"
                className="btn_more"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeedbackExplorer;
