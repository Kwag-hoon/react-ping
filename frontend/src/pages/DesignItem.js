import eye from "../assets/icon-eye.svg";
import like from "../assets/icon-like.svg";
import comments from "../assets/icon-edit.svg";
import { Link } from "react-router-dom";
export default function DesignItem({ item }) {
  return (
    <Link to={`/design/${item.id}`} className="design-item-link">
      <article className="design-item">
        <div className="thumb-wrap" style={{ "--ratio": item.ratio }}>
          <img className="thumb" src={item.url} alt="" loading="lazy" />
        </div>

        <div className="meta">
          <h3>{item.title}</h3>
          <p className="date">{item.date}</p>
          <div className="icons">
            <span><img src={eye} alt="조회수 아이콘" /> {item.views}</span>
            <span><img src={like} alt="좋아요 아이콘" /> {item.likes}</span>
            <span><img src={comments} alt="코멘트 아이콘" /> {item.comments}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
