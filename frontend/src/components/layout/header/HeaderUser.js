import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// assets
import Logogray from '../../../assets/Logo_gray.svg';
import SearchIcon from '../../../assets/icon-search.svg';
import Avartar from '../../../assets/Avatar.png';
import Alarm from '../../../assets/icon-bell.svg';

const HeaderUser = ({ variant }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  // 🔹 로그인 유지: 유저 정보 조회
  useEffect(() => {
    console.log('[HeaderUser] token:', token);

    if (!token) {
      console.log('[HeaderUser] 토큰 없음 → 요청 안 함');
      return;
    }

    console.log('[HeaderUser] /users/me 요청 시작');

    axios
      .get('http://localhost:9070/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('[HeaderUser] /users/me 성공:', res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log('[HeaderUser] /users/me 실패:', err.response?.status);
        console.log('[HeaderUser] 에러 내용:', err.response?.data);

        // 토큰 이상 시 초기화
        localStorage.removeItem('token');
        setUser(null);
      });
  }, [token]);

  // 🔹 임시 로그아웃 (포트폴리오용)
  const handleLogout = (e) => {
    e.preventDefault(); // Link 기본 이동 막기
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header className={`header user ${variant || ''}`}>
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
                  className={({ isActive }) =>
                    `btn-archive ${isActive ? 'active' : ''}`
                  }
                >
                  Archive
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    `btn-upload ${isActive ? 'active' : ''}`
                  }
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
          <img src={Alarm} alt="알람" />

          {/*  닉네임 클릭 시 로그아웃  임시 .*/}
          <Link to="/mypage" className="profile" onClick={handleLogout}>
            <img src={Avartar} alt="user profile" />

            {user && (
              <span className="nickname">
                {user.user_nickname}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};

export default HeaderUser;