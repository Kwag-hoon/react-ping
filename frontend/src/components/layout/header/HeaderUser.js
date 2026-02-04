import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Api from "../../../api/Api";

import logoutImg from "../../../assets/icon-login.svg";
import Logogray from "../../../assets/Logo_gray.svg";
import SearchIcon from "../../../assets/icon-search.svg";
import Alarm from "../../../assets/icon-bell.svg";

const HeaderUser = ({ variant }) => {
  const [user, setUser] = useState(null);

  // ✅ Api baseURL
  const API_BASE = Api.defaults.baseURL || "http://localhost:9070";

  // ✅ API_BASE 선언 이후에 만들어야 함 (에러 방지)
  const DEFAULT_AVATAR_SRC = `${API_BASE}/uploads/default.png`;

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await Api.get("/api/users/me");
        setUser(res.data);
      } catch (err) {
        console.log("[HeaderUser] /api/users/me 실패:", err?.response?.status);
        setUser(null);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) return;

    fetchMe();
  }, []);

  const avatarSrc = useMemo(() => {
    const img = user?.user_image?.trim();

    // ✅ user_image 없으면 서버 default.png
    if (!img) return DEFAULT_AVATAR_SRC;

    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return `${API_BASE}${img}`;

    // "default.png" 같은 파일명만 오면 uploads로
    return `${API_BASE}/uploads/${img}`;
  }, [user, API_BASE, DEFAULT_AVATAR_SRC]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className={`header user ${variant || ""}`}>
      <div className="header-inner">
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
                  className={({ isActive }) =>
                    `btn-archive ${isActive ? "active" : ""}`
                  }
                >
                  Archive
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    `btn-upload ${isActive ? "active" : ""}`
                  }
                >
                  Upload
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-center">
          <form className="search-form">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="search-btn">
              <img src={SearchIcon} alt="search" />
            </button>
          </form>
        </div>

        <div className="header-right">
          <Link to="/mypage" className="profile">
            <img
              src={avatarSrc}
              alt="user profile"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR_SRC;
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
