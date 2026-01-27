// pages/mypage/MyDesigns.js
import React from 'react';
import { Link } from 'react-router-dom';
import IconEye from '../../assets/icon-eye.svg';
import IconLike from '../../assets/icon-like.svg';
import IconMessage from '../../assets/icon-message.svg';

const MyDesigns = () => {
  return (
    <section className="my-designs">
      <div className="my-designs__header">
        <div>
          <h2>My Designs</h2>
          <p>업로드한 디자인을 관리하고 피드백을 수집하세요</p>
        </div>

        <button className="btn-upload">
          <Link to="/upload">+ Upload Design</Link>
        </button>
      </div>

      <div className="design-grid">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Link
            to={`/design/${idx + 1}`}
            // to={`/archive/${item.id}`}
            className="design-card" key={idx}>
            <div className="design-card__thumb">
              <img
                src="https://picsum.photos/400/300"
                alt="design"
              />
            </div>

            <div className="design-card__body">
              <h3>그래픽 관련 질문 드려요</h3>

              <div className="meta">
                <span><img src={IconEye} alt="조회수" /> 21</span>
                <span><img src={IconLike} alt="좋아요" /> 7</span>
                <span><img src={IconMessage} alt="댓글" /> 2</span>
                <span className="date">~2026.02.22</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MyDesigns;
