import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Api from "../../../api/Api"; // ✅ Api 인스턴스 사용

import logoutImg from "../../../assets/icon-login.svg";
// assets
import Logogray from "../../../assets/Logo_gray.svg";
import SearchIcon from "../../../assets/icon-search.svg";
import Alarm from "../../../assets/icon-bell.svg";

// fallback (원하면 네 assets Avatar.png로 바꿔도 됨)
import DefaultAvatar from "../../../assets/Avatar.png";

const HeaderUser = ({ variant }) => {
  const [user, setUser] = useState(null);

  // Api baseURL 가져오기
  const API_BASE = Api.defaults.baseURL || "http://localhost:9070";

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // ✅ 토큰은 Api 인터셉터가 자동으로 붙임
        const res = await Api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.log("[HeaderUser] /users/me 실패:", err?.response?.status);
        setUser(null);
      }
    };

    // 토큰 없으면 요청 안 함
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchMe();
  }, []);

  // ✅ 마이페이지와 같은 규칙으로 아바타 URL 만들기
  const avatarSrc = useMemo(() => {
    const img = user?.user_image;

    if (!img) return DefaultAvatar;

    // 이미 절대 URL이면 그대로
    if (img.startsWith("http")) return img;

    // "/uploads/xxx.png" 형태면 API_BASE 붙이기
    if (img.startsWith("/")) return `${API_BASE}${img}`;

    // "default.png" 같이 파일명만이면 /uploads/로 가정
    return `${API_BASE}/uploads/${img}`;
  }, [user, API_BASE]);

  // 🔹 임시 로그아웃 (포트폴리오용)
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className={`header user ${variant || ""}`}>
      <div className="header-inner">
        {/* 좌측 */}
        <div className="header-left">
          <h1>
            <Link to="/" className="logo">
              <img src={Logogray} alt="핑로고" />
            </Link>
          </h1>

          <nav className="gnb">
            <ul>
              <li>
                <NavLink
                  to="/archive"
                  className={({ isActive }) => `btn-archive ${isActive ? "active" : ""}`}
                >
                  Archive
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className={({ isActive }) => `btn-upload ${isActive ? "active" : ""}`}
                >
                  Upload
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* 중앙 */}
        <div className="header-center">
          <form className="search-form">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="search-btn">
              <img src={SearchIcon} alt="search" />
            </button>
          </form>
        </div>

        {/* 우측 */}
        <div className="header-right">
          <Link to="/mypage" className="profile">
            <img
              src={avatarSrc}
              alt="user profile"
              onError={(e) => {
                e.currentTarget.src = DefaultAvatar;
              }}
            />

            {user && <span className="nickname">{user.user_nickname}</span>}
          </Link>

          <div className="btns">
            <button className="alarm-btn">
              <img src={Alarm} alt="알람" />
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <img src={logoutImg} alt="로그아웃 이미지" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
