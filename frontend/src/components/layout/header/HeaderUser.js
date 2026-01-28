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

  useEffect(() => {
    // 🔴 토큰 없으면 절대 호출 안 함
    if (!token) return;

    axios
      .get('http://localhost:9070/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        // 토큰 이상 시 조용히 초기화
        localStorage.removeItem('token');
        setUser(null);
      });
  }, [token]);

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

          <Link to="/mypage" className="profile">
            <img src={Avartar} alt="user profile" />

            {/* 로그인 + 유저 정보 로드 완료 시만 표시 */}
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
