import { useEffect, useMemo, useState } from "react";

export default function IssueTypeMergeModal({ source, candidates, onClose, onSubmit }) {
  const [targetId, setTargetId] = useState(candidates?.[0]?.id || null);

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

  const target = useMemo(() => candidates.find((c) => c.id === Number(targetId)), [candidates, targetId]);

  const submit = () => {
    if (!targetId) return;
    onSubmit?.({ sourceId: source.id, targetId: Number(targetId) });
  };

  return (
    <div className="issue-modal__overlay" onMouseDown={onClose}>
      <div className="issue-modal issue-modal--merge" onMouseDown={(e) => e.stopPropagation()}>
        <div className="issue-modal__head">
          <div>
            <div className="issue-modal__title">문제 유형 병합</div>
            <div className="issue-modal__subtitle">기존 유형을 다른 유형으로 합칩니다</div>
          </div>
          <button className="issue-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="issue-modal__body">
          <div className="merge-box">
            <div className="merge-row">
              <div className="merge-label">병합할 유형</div>
              <div className="merge-value">
                <strong>{source.name}</strong>
                <span className="merge-sub">{source.groupKo}</span>
              </div>
            </div>

            <div className="merge-row">
              <div className="merge-label">대상 유형 선택</div>
              <select className="im-select" value={targetId || ""} onChange={(e) => setTargetId(e.target.value)}>
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.groupKo})
                  </option>
                ))}
              </select>
            </div>

            <div className="merge-warning">
              ⚠ 병합하면 <strong>{source.name}</strong>은(는) 비활성화되고,
              사용 데이터(사용 빈도/연결)는 <strong>{target?.name || "선택한 대상"}</strong>으로 합쳐집니다.
            </div>
          </div>
        </div>

        <div className="issue-modal__foot">
          <button className="im-btn" onClick={onClose}>
            취소
          </button>
          <button className="im-btn im-btn--primary" onClick={submit}>
            병합 적용
          </button>
        </div>
      </div>
    </div>
  );
}
