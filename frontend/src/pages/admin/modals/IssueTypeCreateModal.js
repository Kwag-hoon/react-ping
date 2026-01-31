import { useEffect, useMemo, useState } from "react";

export default function IssueTypeCreateModal({ taxonomy, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [groupKey, setGroupKey] = useState(taxonomy?.[0]?.groupKey || "");

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

  const selectedGroup = useMemo(
    () => taxonomy.find((g) => g.groupKey === groupKey),
    [taxonomy, groupKey]
  );

  const preview = {
    dot: "purple",
    title: name || "문제 유형 이름",
    sub: desc || "문제 유형 설명이 여기에 표시됩니다",
  };

  const submit = () => {
    if (!name.trim()) return;
    onSubmit?.({ name: name.trim(), desc: desc.trim(), groupKey });
  };

  return (
    <div className="issue-modal__overlay" onMouseDown={onClose}>
      <div className="issue-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="issue-modal__head">
          <div>
            <div className="issue-modal__title">새 문제 유형 추가</div>
            <div className="issue-modal__subtitle">의미있고 일관된 문제 분류 체계 유지</div>
          </div>
          <button className="issue-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="issue-modal__body">
          <div className="im-field">
            <div className="im-label">문제 유형 이름</div>
            <input
              className="im-input"
              placeholder="예: 정보 위계"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="im-field">
            <div className="im-label">설명</div>
            <textarea
              className="im-textarea"
              placeholder="이 문제 유형이 다루는 디자인 이슈를 설명하세요..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="im-field">
            <div className="im-label">테마</div>

            {/* 캡쳐처럼 2x2 버튼 느낌 */}
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

          <div className="im-preview">
            <div className="im-preview__title">미리보기</div>
            <div className="im-preview__card">
              <span className="im-preview__dot" />
              <div>
                <div className="im-preview__name">{preview.title}</div>
                <div className="im-preview__desc">{preview.sub}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="issue-modal__foot">
          <button className="im-btn" onClick={onClose}>
            취소
          </button>
          <button className="im-btn im-btn--primary" onClick={submit} disabled={!name.trim()}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
