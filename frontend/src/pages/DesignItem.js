// DesignItem.jsx
export default function DesignItem({ item }) {
  return (
    <article className="design-item">
      <div className="thumb-wrap" style={{ "--ratio": item.ratio }}>
  <img className="thumb" src={item.url} alt="" loading="lazy" />
</div>

      <div className="meta">
        <h3>{item.title}</h3>
        <p className="date">{item.date}</p>
        <div className="icons">
          <span>👁 {item.views}</span>
          <span>♡ {item.likes}</span>
          <span>💬 {item.comments}</span>
        </div>
      </div>
    </article>
  );
}
