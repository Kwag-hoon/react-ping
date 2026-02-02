import eye from "../assets/icon-eye.svg";
import like from "../assets/icon-like.svg";
import comments from "../assets/icon-edit.svg";
import { Link } from "react-router-dom";

//날짜 포맷 함수 (년 - 월 - 일)
const formatDate = (dateString) => {
  if(!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\.$/, ""); // 마지막 점만 제거
};

export default function DesignItem({ item, linkable = true }) {
  // Link 태그 옵션화 사용 안할시 <DesignItem item={item} linkable={false} />
  const content = (
    <article className="design-item">
      <div className="thumb-wrap" style={{ "--ratio": item.ratio }}>
        <img className="thumb"
          //src={item.url} 
          //alt="" 
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </div>

      <div className="meta">
        <h3>{item.title}</h3>
        <p className="date">{formatDate(item.date)}</p>
        <div className="icons">
          <span><img src={eye} alt="조회수 아이콘" /> {item.views ?? 0}</span>
          <span><img src={like} alt="좋아요 아이콘" /> {item.likes ?? 0}</span>
          <span><img src={comments} alt="코멘트 아이콘" /> {item.comments ?? 0}</span>
        </div>
      </div>
    </article>
  );

  if(!linkable) return content;
  return (
    <Link to={`/detail/${item.id}`} 
    className="design-item-link">
      {content}
    </Link>
  );
}
