import { useMemo, useState } from "react";
import AdminSearchBar from "../components/AdminSearchBar";
import StatusBadge from "../components/StatusBadge";
import DesignModal from "../modals/DesignModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function AdminDesign() {
  const [q, setQ] = useState("");

  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // ✅ 더미 데이터 (나중에 API로 교체)
  const [rows, setRows] = useState([
    {
      id: 1,
      title: "모바일 뱅킹 앱 - 거래 플로우",
      author: "김서연",
      status: "active",
      pins: 3,
      comments: 12,
      reports: 0,
      createdAt: "2026년 1월 14일 오후 07:30",
      issueTypes: ["정보구조", "사용자 흐름", "피드백/응답"],
    },
    {
      id: 2,
      title: "대시보드 리디자인",
      author: "박민준",
      status: "flagged",
      pins: 1,
      comments: 5,
      reports: 2,
      createdAt: "2026년 1월 13일 오후 11:30",
      issueTypes: ["레이아웃/그리드"],
    },
    {
      id: 3,
      title: "이커머스 제품 페이지",
      author: "이지은",
      status: "active",
      pins: 0,
      comments: 3,
      reports: 0,
      createdAt: "2026년 1월 12일 오후 06:00",
      issueTypes: [],
    },
  ]);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return rows;
    return rows.filter((r) => {
      return (
        r.title.toLowerCase().includes(keyword) ||
        r.author.toLowerCase().includes(keyword)
      );
    });
  }, [q, rows]);

  // ✅ 모달에서 저장된 값 반영(지금은 로컬 state만 갱신)
  const handleSaveFromModal = ({ id, issueTypes, message }) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, issueTypes, lastMessage: message } : r))
    );
    setViewItem(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    setRows((prev) => prev.filter((r) => r.id !== deleteItem.id));
    setDeleteItem(null);
  };

  return (
    <section className="admin-page">
      {/* 검색 */}
      <div className="admin-card admin-card--search">
        <AdminSearchBar value={q} onChange={setQ} placeholder="디자인 검색..." />
      </div>

      {/* 테이블 */}
      <div className="admin-card admin-card--table">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="col-title">디자인</th>
              <th>작성자</th>
              <th>상태</th>
              <th>핀</th>
              <th>댓글</th>
              <th>신고</th>
              <th className="col-date">생성일</th>
              <th className="col-actions">작업</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="admin-table__empty">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td className="col-title">
                    <strong className="title">{row.title}</strong>
                  </td>
                  <td>{row.author}</td>
                  <td>
                    <StatusBadge value={row.status} />
                  </td>
                  <td>{row.pins}</td>
                  <td>{row.comments}</td>
                  <td className={row.reports > 0 ? "text-danger" : ""}>{row.reports}</td>
                  <td className="col-date">{row.createdAt}</td>
                  <td className="col-actions">
                    <div className="row-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="보기"
                        title="보기"
                        onClick={() => setViewItem(row)}
                      >
                        👁
                      </button>

                      <button
                        type="button"
                        className="icon-btn danger"
                        aria-label="삭제"
                        title="삭제"
                        onClick={() => setDeleteItem(row)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 👁 디자인 검토 모달 */}
      {viewItem && (
        <DesignModal
          item={viewItem}
          onClose={() => setViewItem(null)}
          onSave={handleSaveFromModal}
        />
      )}

      {/* 🗑 삭제 확인 모달 */}
      {deleteItem && (
        <ConfirmDeleteModal
          title="삭제하시겠습니까?"
          message={`"${deleteItem.title}"을(를) 삭제합니다.`}
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </section>
  );
}
