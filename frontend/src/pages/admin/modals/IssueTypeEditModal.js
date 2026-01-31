import { useEffect, useState } from "react";

export default function IssueTypeEditModal({ taxonomy, item, onClose, onSubmit }) {
  const [name, setName] = useState(item?.name || "");
  const [desc, setDesc] = useState(item?.desc || "");
  const [groupKey, setGroupKey] = useState(item?.groupKey || taxonomy?.[0]?.groupKey || "");

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const submit = () => {
    if (!name.trim()) return;
    onSubmit?.({ id: item.id, name: name.trim(), desc: desc.trim(), groupKey });
  };

  return (
    <div className="issue-modal__overlay" onMouseDown={onClose}>
      <div className="issue-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="issue-modal__head">
          <div>
            <div className="issue-modal__title">문제 유형 편집</div>
            <div className="issue-modal__subtitle">분류명/설명을 수정하고 저장합니다</div>
          </div>
          <button className="issue-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="issue-modal__body">
          <div className="im-field">
            <div className="im-label">문제 유형 이름</div>
            <input className="im-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="im-field">
            <div className="im-label">설명</div>
            <textarea className="im-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className="im-field">
            <div className="im-label">테마</div>
            <div className="im-theme-grid">
              {taxonomy.map((g) => (
                <button
                  type="button"
                  key={g.groupKey}
                  className={`im-theme-btn ${groupKey === g.groupKey ? "is-active" : ""}`}
                  onClick={() => setGroupKey(g.groupKey)}
                >
                  <span className="im-dot" />
                  {g.groupKo}
                  {groupKey === g.groupKey && <span className="im-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="issue-modal__foot">
          <button className="im-btn" onClick={onClose}>
            취소
          </button>
          <button className="im-btn im-btn--primary" onClick={submit}>
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
}
