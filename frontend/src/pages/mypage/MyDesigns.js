// src/pages/mypage/MyDesigns.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../api/Api";

import IconEye from "../../assets/icon-eye.svg";
import IconLike from "../../assets/icon-like.svg";
import IconMessage from "../../assets/icon-message.svg";

const MyDesigns = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyDesigns = async () => {
      try {
        setLoading(true);
        const res = await Api.get("/mypage/designs", {
          params: { limit: 20, offset: 0 },
        });
        setItems(res.data.items || []);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "디자인 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyDesigns();
  }, []);

  if (loading) return <p className="loading">로딩중...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <section className="my-designs">
      <div className="my-designs__header">
        <div>
          <h2>My Designs</h2>
          <p>업로드한 디자인을 관리하고 피드백을 수집하세요</p>
        </div>

        <Link to="/upload" className="btn-upload design-btn">
          + Upload Design
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>아직 업로드한 디자인이 없습니다.</p>
          <Link to="/upload" className="btn-upload">
            첫 디자인 업로드하기
          </Link>
        </div>
      ) : (
        <div className="design-grid">
          {items.map((item) => (
            <Link
              key={item.post_no}
              to={`/mypage/designs/${item.post_no}`}    // ✅ 공용 상세(아카이브 디테일)로 이동
              className="design-card"
            >
              <div className="design-card__thumb">
                <img
                  src={`https://picsum.photos/400/300?random=${item.post_no}`}
                  alt={item.post_title}
                />
              </div>

              <div className="design-card__body">
                <h3>{item.post_title}</h3>

                <div className="meta">
                  <span>
                    <img src={IconEye} alt="조회수" /> {item.view_count}
                  </span>
                  <span>
                    <img src={IconLike} alt="좋아요" /> {item.like_count}
                  </span>
                  <span>
                    <img src={IconMessage} alt="댓글" /> {item.dislike_count}
                  </span>
                  <span className="date">{item.create_datetime?.slice(0, 10)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyDesigns;
