import { useEffect, useMemo, useRef, useState } from "react";
import AdminSearchBar from "../components/AdminSearchBar";
import StatusBadge from "../components/StatusBadge";
import UserModal from "../modals/UserModal";

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ 더미 데이터 (API로 교체)
  const users = useMemo(
    () => [
      {
        id: "u1",
        name: "김서연",
        email: "kim@example.com",
        role: "PRO",
        joinDate: "2025년 11월 3일",
        lastActive: "2026년 1월 17일 오후 11:30",
        activeDays: 85,
        designs: 15,
        pins: 23,
        comments: 47,
        reports: 0,
        activity: "High",
        status: "active",
        recent: [
          { type: "design", title: "모바일 뱅킹 앱 - 거래 플로우", date: "2026년 1월 16일 오후 11:30" },
          { type: "comment", title: "대시보드 리디자인에 댓글 작성", date: "2026년 1월 15일 오후 08:20" },
          { type: "pin", title: "이커머스 제품 페이지에 핀 생성", date: "2026년 1월 14일 오후 06:45" },
          { type: "design", title: "SaaS 대시보드 UI", date: "2026년 1월 13일 오전 01:00" },
        ],
      },
      {
        id: "u2",
        name: "박민준",
        email: "park@example.com",
        role: "JUNIOR",
        joinDate: "2025년 10월 15일",
        lastActive: "2026년 1월 16일 오후 09:10",
        activeDays: 52,
        designs: 23,
        pins: 34,
        comments: 89,
        reports: 2,
        activity: "High",
        status: "warned",
        recent: [],
      },
      {
        id: "u3",
        name: "이지은",
        email: "lee@example.com",
        role: "JUNIOR",
        joinDate: "2025년 9월 1일",
        lastActive: "2026년 1월 16일 오후 05:45",
        activeDays: 41,
        designs: 8,
        pins: 45,
        comments: 156,
        reports: 0,
        activity: "High",
        status: "active",
        recent: [],
      },
      {
        id: "u6",
        name: "익명123",
        email: "anon@example.com",
        role: "GENERAL",
        joinDate: "2026년 1월 15일",
        lastActive: "2026년 1월 17일 오후 04:20",
        activeDays: 3,
        designs: 1,
        pins: 2,
        comments: 15,
        reports: 8,
        activity: "Medium",
        status: "suspended",
        recent: [],
      },
    ],
    []
  );

  // ✅ 상단 통계
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const warned = users.filter((u) => u.status === "warned").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    const high = users.filter((u) => u.activity === "High").length;
    const reported = users.filter((u) => (u.reports || 0) > 0).length;
    return { total, active, warned, suspended, high, reported };
  }, [users]);

  // ✅ 검색 필터
  const filtered = useMemo(() => {
    let result = users;

    // 1. 키워드 검색
    const keyword = q.trim().toLowerCase();
    if (keyword) {
      result = result.filter((u) =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        u.id.toLowerCase().includes(keyword)
      );
    }

    // 2. 상태 필터
    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    return result;
  }, [q, statusFilter, users]);

  // ✅ 바깥 클릭 시 메뉴 닫기
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

  const openUserModal = (user) => {
    setSelectedUser(user);
    setOpenMenuId(null);
  };

  const actionWarn = (user) => {
    console.log("경고 발송", user.id);
    setOpenMenuId(null);
    setSelectedUser(user); // 모달에서 처리하는 방식도 OK
  };

  const actionSuspend = (user) => {
    console.log("일시 정지", user.id);
    setOpenMenuId(null);
    setSelectedUser(user);
  };

  const actionEmail = (user) => {
    console.log("이메일 보내기", user.id);
    setOpenMenuId(null);
    setSelectedUser(user);
  };

  const actionDeactivate = (user) => {
    console.log("영구 비활성화", user.id);
    setOpenMenuId(null);
    setSelectedUser(user);
  };

  return (
    <section className="admin-page">
      {/* 상단 타이틀 카드 */}
      <div className="admin-card admin-card--header">
        <h2>사용자 관리</h2>
        <p>명확하고 데이터 중심적인 중재 효율성</p>
      </div>

      {/* 통계 카드 */}
      <div className="users-stats">
        <div className="users-stat">
          <div className="users-stat__label">전체 사용자</div>
          <div className="users-stat__value">{stats.total}</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__label">활성</div>
          <div className="users-stat__value green">{stats.active}</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__label">경고됨</div>
          <div className="users-stat__value amber">{stats.warned}</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__label">정지됨</div>
          <div className="users-stat__value red">{stats.suspended}</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__label">활발한 활동</div>
          <div className="users-stat__value">{stats.high}</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__label">신고당한 사용자</div>
          <div className="users-stat__value red">{stats.reported}</div>
        </div>
      </div>

      {/* 검색 */}
      <div className="admin-card admin-card--search-bar">
        <AdminSearchBar value={q} onChange={setQ} placeholder="사용자 이름 또는 ID 검색..." />
        
        <div className="admin-select-wrapper">
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="warned">경고됨</option>
            <option value="suspended">정지됨</option>
            <option value="inactive">비활성</option>
          </select>
          <span className="admin-select-arrow">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* 테이블 */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>사용자</th>
              <th>가입일</th>
              <th>디자인</th>
              <th>핀</th>
              <th>댓글</th>
              <th>신고당함</th>
              <th>활동</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{u.name.slice(0, 1)}</div>
                    <div className="user-info">
                      <div className="user-name-row">
                        <span className="user-name">{u.name}</span>
                        <span className={`user-chip user-chip--${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </div>
                      <div className="user-id">{u.id}</div>
                    </div>
                  </div>
                </td>

                <td className="muted">{u.joinDate}</td>
                <td className="center">{u.designs}</td>
                <td className="center">{u.pins}</td>
                <td className="center">{u.comments}</td>

                <td className="center">
                  {u.reports > 0 ? <span className="report-num">{u.reports}</span> : 0}
                </td>

                <td>
                  <div className={`activity activity--${u.activity.toLowerCase()}`}>
                    <span className="activity-dot" />
                    {u.activity}
                  </div>
                </td>

                <td>
                  <StatusBadge value={u.status} />
                </td>

                <td className="center">
                  <div className="users-menu-wrap">
                    <button
                      type="button"
                      className="icon-btn users-menu-btn"
                      onClick={() => toggleMenu(u.id)}
                      aria-label="메뉴"
                    >
                      ⋮
                    </button>

                    {openMenuId === u.id && (
                      <div className="users-menu" ref={menuRef}>
                        <button className="users-menu__item" onClick={() => openUserModal(u)}>
                          👤 상세 보기
                        </button>
                        <button className="users-menu__item" onClick={() => actionWarn(u)}>
                          🛡 경고 발송
                        </button>
                        <button className="users-menu__item" onClick={() => actionSuspend(u)}>
                          ⛔ 일시 정지
                        </button>
                        <button className="users-menu__item" onClick={() => actionEmail(u)}>
                          ✉ 이메일 보내기
                        </button>

                        <div className="users-menu__divider" />

                        <button
                          className="users-menu__item users-menu__item--danger"
                          onClick={() => actionDeactivate(u)}
                        >
                          🚫 영구 비활성화
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 사용자 상세 모달 */}
      {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </section>
  );
}
