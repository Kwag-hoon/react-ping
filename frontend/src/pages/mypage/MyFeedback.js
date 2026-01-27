import React from 'react';
import IconMessage from '../../assets/icon-message.svg';

const MyFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      title: '대시보드 리디자인 - 데이터 시각화',
      author: '박민준',
      date: '1월 14일',
      thumbnail: '/images/sample-dashboard.png',
      question:
        '그래프의 색상 팔레트 선택이 적절한지 커뮤니티의 피드백을 구합니다.',
      myfeedback:
        '붉은 대비와 색맹 친화적인 색상을 사용하신 게 좋습니다. 파란색은 긍정적 트렌드, 빨간색은 경고 의미로 해석되기 쉬워 직관적입니다.',
    },
  ];

  return (
    <section className="my-feedback">
      {/* 타이틀 */}
      <div className="mypage-section-header">
        <h2>My Feedback</h2>
        <p>
          디자인을 어떻게 해석하고 어떤 기준으로 말해왔는지를 조용히
          되돌아보는 공간이다.
        </p>
      </div>

      {/* 요약 */}
      <div className="feedback-summary">
        <img src={IconMessage} alt="댓글" />
        <span>총 {feedbacks.length}개의 피드백을 남겼습니다</span>
      </div>

      {/* 리스트 */}
      <div className="feedback-list">
        {feedbacks.map((item) => (
          <div className="feedback-item" key={item.id}>
            <img src={item.thumbnail} alt="" />

            <div className="content">
              {/* 메타 */}
              <div className="meta">
                <span className="name">{item.author}</span>
                <span>·</span>
                <span className="date">{item.date}</span>
                {item.isNew && <span className="new">새 댓글</span>}
              </div>

              {/* 제목 */}
              <h3>{item.title}</h3>

              {/* 질문 */}
              <div className="question">
                <span className="label">질문</span>
                <p>{item.question}</p>
              </div>

              {/* 내 피드백 */}
              <div className="my-feedback-text">
                <span className="label">
                  <img src={IconMessage} alt="댓글" />
                  <strong>내 피드백</strong>
                </span>
                <p>{item.myfeedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyFeedback;
