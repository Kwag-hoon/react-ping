import { useEffect, useMemo, useRef, useState } from "react";
import AdminSearchBar from "../components/AdminSearchBar";

import IssueTypeCreateModal from "../modals/IssueTypeCreateModal";
import IssueTypeEditModal from "../modals/IssueTypeEditModal";
import IssueTypeMergeModal from "../modals/IssueTypeMergeModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { deleteIssueType } from "../../../api/Admin_Api";

import { ISSUE_TAXONOMY, GROUP_COLOR } from "../data/issueTaxonomy";

export default function AdminIssueTypes() {
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState("all");
  const [status, setStatus] = useState("all");

  // ⋮ 메뉴
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // 모달 상태
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [mergeTarget, setMergeTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ✅ 실제 사용하는 “문제유형”을 타이핑 데이터로 초기 구성
  const [types, setTypes] = useState(() => {
    let id = 1;
    const now = "2026년 1월 17일";
    return ISSUE_TAXONOMY.flatMap((group) =>
      group.items.map((it) => ({
        id: id++,
        groupKey: group.groupKey,
        groupLabel: group.groupLabel,
        groupKo: group.groupKo,
        name: it.label,
        nameEn: it.en,
        desc: it.help,
        createdAt: now,
        usageCount: Math.floor(Math.random() * 250) + 10, // 더미
        isActive: true,
      }))
    );
  });

  // 상단 통계
  const stats = useMemo(() => {
    const totalTypes = types.length;
    const activeTypes = types.filter((t) => t.isActive).length;
    const totalUsage = types.reduce((sum, t) => sum + (t.usageCount || 0), 0);
    const pinnedCount = 121; // 너 캡쳐 숫자 고정(나중에 API로)
    return { totalTypes, activeTypes, totalUsage, pinnedCount };
  }, [types]);

  // 그룹별 분포 (상단 막대)
  const groupDist = useMemo(() => {
    const byGroup = ISSUE_TAXONOMY.map((g) => {
      const list = types.filter((t) => t.groupKey === g.groupKey && t.isActive);
      const count = list.reduce((s, t) => s + (t.usageCount || 0), 0);
      return { groupKey: g.groupKey, label: g.groupKo, count };
    });
    const total = byGroup.reduce((s, x) => s + x.count, 0) || 1;
    return byGroup.map((x) => ({
      ...x,
      percent: Math.round((x.count / total) * 1000) / 10,
      color: GROUP_COLOR[x.groupKey],
    }));
  }, [types]);

  // 검색
  const filtered = useMemo(() => {
    let result = types;

    // 1. 키워드
    const keyword = q.trim().toLowerCase();
    if (keyword) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(keyword) ||
        (t.desc || "").toLowerCase().includes(keyword) ||
        (t.groupKo || "").toLowerCase().includes(keyword)
      );
    }

    // 2. 테마
    if (theme !== "all") {
      result = result.filter((t) => t.groupKo === theme);
    }

    // 3. 상태
    if (status !== "all") {
      const isActive = status === "active";
      result = result.filter((t) => t.isActive === isActive);
    }

    return result;
  }, [q, types, theme, status]);

  // 메뉴 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (!openMenuId) return;
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      setOpenMenuId(null);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [openMenuId]);

  const toggleMenu = (id) => setOpenMenuId((prev) => (prev === id ? null : id));

  // actions
  const openEdit = (t) => {
    setEditTarget(t);
    setOpenMenuId(null);
  };

  const openMerge = (t) => {
    setMergeTarget(t);
    setOpenMenuId(null);
  };
  const openDelete = (t) => {
    setDeleteTarget(t);
    setOpenMenuId(null);
  };

  const toggleActive = (t) => {
    setTypes((prev) => prev.map((x) => (x.id === t.id ? { ...x, isActive: !x.isActive } : x)));
    setOpenMenuId(null);
  };

  const onCreate = ({ name, desc, groupKey }) => {
    const group = ISSUE_TAXONOMY.find((g) => g.groupKey === groupKey);
    const newItem = {
      id: Date.now(),
      groupKey,
      groupLabel: group?.groupLabel || "",
      groupKo: group?.groupKo || "",
      name,
      nameEn: "",
      desc,
      createdAt: "방금",
      usageCount: 0,
      isActive: true,
    };
    setTypes((prev) => [newItem, ...prev]);
    setIsCreateOpen(false);
  };

  const onEditSave = ({ id, name, desc, groupKey }) => {
    const group = ISSUE_TAXONOMY.find((g) => g.groupKey === groupKey);
    setTypes((prev) =>
      prev.map((x) =>
        x.id === id
          ? {
            ...x,
            name,
            desc,
            groupKey,
            groupLabel: group?.groupLabel || x.groupLabel,
            groupKo: group?.groupKo || x.groupKo,
          }
          : x
      )
    );
    setEditTarget(null);
  };

  const onMergeApply = ({ sourceId, targetId }) => {
    // 실제론: sourceId의 usage를 targetId로 합치고 source 비활성/삭제 처리
    setTypes((prev) => {
      const src = prev.find((x) => x.id === sourceId);
      if (!src) return prev;
      return prev
        .map((x) =>
          x.id === targetId ? { ...x, usageCount: (x.usageCount || 0) + (src.usageCount || 0) } : x
        )
        .map((x) => (x.id === sourceId ? { ...x, isActive: false } : x));
    });
    setMergeTarget(null);
  };

  return (
    <section className="admin-page issue-page">
      {/* 헤더 카드 */}
      <div className="admin-card issue-head">
        <div>
          <h2>문제 유형 관리</h2>
          <p>일관되고 의미있는 문제 분류 체계를 유지합니다</p>
        </div>

        <button type="button" className="issue-primary" onClick={() => setIsCreateOpen(true)}>
          + 새 문제 유형
        </button>
      </div>

      {/* 상단 통계 */}
      <div className="issue-stats">
        <div className="issue-stat">
          <div className="issue-stat__label">전체 유형</div>
          <div className="issue-stat__value">{stats.totalTypes}</div>
        </div>
        <div className="issue-stat">
          <div className="issue-stat__label">활성 유형</div>
          <div className="issue-stat__value green">{stats.activeTypes}</div>
        </div>
        <div className="issue-stat">
          <div className="issue-stat__label">총 사용 횟수</div>
          <div className="issue-stat__value">{stats.totalUsage.toLocaleString()}</div>
        </div>
        <div className="issue-stat">
          <div className="issue-stat__label">핀즈 사용</div>
          <div className="issue-stat__value">{stats.pinnedCount}</div>
        </div>
      </div>

      {/* 테마 사용 분포(막대) */}
      <div className="admin-card issue-dist">
        <div className="issue-dist__title">테마별 사용 분포</div>

        <div className="issue-bars">
          {groupDist.map((g) => (
            <div key={g.groupKey} className="issue-bar">
              <div className="issue-bar__left">
                <span className={`issue-dot issue-dot--${g.color}`} />
                <span className="issue-bar__label">{g.label}</span>
              </div>

              <div className="issue-bar__track">
                <div className={`issue-bar__fill issue-bar__fill--${g.color}`} style={{ width: `${g.percent}%` }} />
              </div>

              <div className="issue-bar__right">
                <span className="issue-bar__count">{g.count.toLocaleString()} 사용</span>
                <span className="issue-bar__pct">{g.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 검색 */}
      <div className="admin-card admin-card--search-bar">
        <AdminSearchBar value={q} onChange={setQ} placeholder="문제 유형 검색..." />

        <div className="admin-select-wrapper">
          <select
            className="admin-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="all">모든 테마</option>
            <option value="정보구조">정보구조</option>
            <option value="인터렉션">인터렉션</option>
            <option value="사용성">사용성</option>
            <option value="비주얼디자인">비주얼디자인</option>
          </select>
          <span className="admin-select-arrow">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        <div className="admin-select-wrapper">
          <select
            className="admin-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
          <span className="admin-select-arrow">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="issue-list">
        {filtered.map((t) => (
          <div key={t.id} className={`issue-item ${t.isActive ? "" : "is-inactive"}`}>
            
            <div className={`issue-accent issue-accent--${GROUP_COLOR[t.groupKey] || "blue"}`} />

            <div className="issue-item__body">
              <div className="issue-item__top">
                <div className="issue-item__title">{t.name}</div>

                <div className="issue-item__menuWrap">
                  <button
                    type="button"
                    className="icon-btn issue-menu-btn"
                    onClick={() => toggleMenu(t.id)}
                    aria-label="메뉴"
                  >
                    ⋮
                  </button>

                  {openMenuId === t.id && (
                    <div className="issue-menu" ref={menuRef}>
                      <button className="issue-menu__item" onClick={() => openEdit(t)}>
                        ✏ 편집
                      </button>
                      <button className="issue-menu__item" onClick={() => openMerge(t)}>
                        ⤴ 병합
                      </button>
                      <button className="issue-menu__item" onClick={() => toggleActive(t)}>
                        👁‍🗨 비활성화
                      </button>
                      <button className="issue-menu__item danger" onClick={() => openDelete(t)}>
                        🗑 삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="issue-item__meta">
                <span className={`issue-pill issue-pill--${GROUP_COLOR[t.groupKey] || "blue"}`}>
                  {t.groupKo}
                </span>
                <span className="issue-muted">작성자: 관리자 · {t.createdAt}</span>
              </div>

              <div className="issue-item__desc">{t.desc}</div>

              <div className="issue-item__usage">
                <div className="issue-usage__label">사용 빈도</div>
                <div className="issue-usage__track">
                  <div
                    className={`issue-usage__fill issue-usage__fill--${GROUP_COLOR[t.groupKey] || "blue"}`}
                    style={{ width: `${Math.min(100, (t.usageCount / 300) * 100)}%` }}
                  />
                </div>

                <div className="issue-usage__right">
                  <span className="issue-usage__count">{t.usageCount}회</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create */}
      {isCreateOpen && (
        <IssueTypeCreateModal
          taxonomy={ISSUE_TAXONOMY}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={onCreate}
        />
      )}

      {/* Edit (Create랑 폼은 비슷하지만 타이틀/버튼/초기값 다름) */}
      {editTarget && (
        <IssueTypeEditModal
          taxonomy={ISSUE_TAXONOMY}
          item={editTarget}
          onClose={() => setEditTarget(null)}
          onSubmit={onEditSave}
        />
      )}

      {/* Merge (완전히 다른 UX) */}
      {mergeTarget && (
        <IssueTypeMergeModal
          taxonomy={ISSUE_TAXONOMY}
          source={mergeTarget}
          candidates={types.filter((x) => x.id !== mergeTarget.id && x.isActive)}
          onClose={() => setMergeTarget(null)}
          onSubmit={onMergeApply}
        />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal
          title="삭제하시겠습니까?"
          message={`"${deleteTarget.name}" 유형을 삭제합니다.`}
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            const groupName = deleteTarget.groupKo;
            const categoryName = deleteTarget.name;
            deleteIssueType(groupName, categoryName)
              .then(() => {
                setTypes((prev) => prev.filter((x) => x.id !== deleteTarget.id));
              })
              .catch((err) => {
                alert((err && err.response && err.response.data && err.response.data.message) || "삭제 실패");
              })
              .finally(() => {
                setDeleteTarget(null);
              });
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </section>
  );
}
