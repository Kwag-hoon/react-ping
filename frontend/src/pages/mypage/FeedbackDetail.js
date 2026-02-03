// src/pages/mypage/FeedbackDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";

const API_BASE = "http://localhost:9070";

export default function FeedbackDetail() {
  const { answer_no } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    Api.get(`/api/feedback/${answer_no}`).then((res) => {
      setData(res.data);
    });
  }, [answer_no]);

  if (!data) return <p>로딩중...</p>;

  return (
    <section className="feedback-detail">
      <h2>{data.post_title}</h2>

      {data.image_path && (
        <img
          src={`${API_BASE}${data.image_path}`}
          alt=""
          style={{ maxWidth: "100%", borderRadius: 12 }}
        />
      )}

      <div>
        <h4>질문</h4>
        <p>{data.question_content}</p>
      </div>

      <hr />

      <div>
        <h4>내 피드백</h4>
        <p>{data.answer_content}</p>
      </div>
    </section>
  );
}
