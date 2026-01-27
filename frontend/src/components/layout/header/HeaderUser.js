import { Link, NavLink } from 'react-router-dom';

// 핑 로고(svg) 가져오기
import Logogray from '../../../assets/Logo_gray.svg';
import SearchIcon from '../../../assets/icon-search.svg';
import Avartar from '../../../assets/Avatar.png';
import Alarm from '../../../assets/icon-bell.svg';



const HeaderUser = ({ variant }) => {
  return (
    <header className={`header user ${variant}`}>
      <div className="header-inner">
        {/* 좌측: 로고 + 메뉴 */}
        <div className="header-left">
          <h1>
            <Link to="/" className="logo">
              <img src={Logogray} alt="핑로고" />
            </Link>
          </h1>
          <nav className="gnb">
            
           <ul>
              <li>
                <NavLink to="/archive"              
                 className={({ isActive }) => `btn-archive ${isActive ? 'active' : ''}`}
                >Archive</NavLink>
              </li>
              <li>
                <NavLink to="/upload" 
                 className={({ isActive }) => `btn-upload ${isActive ? 'active' : ''}`}
                >Upload</NavLink>
              </li>
           </ul>
          </nav>
        </div>

        {/* 중앙: 검색 */}
        <div className="header-center">
          <form action="/search" method=" " className="search-form">
            <input 
            type="text" 
            name="query" 
            placeholder="Search..." />
            <button type="submit" className="search-btn"><img src={SearchIcon} alt="search" /></button>
          </form>
        </div>

        {/* 우측: 업로드 버튼 + 프로필 */}
        <div className="header-right">
          
          <img src={Alarm} alt="알람" />

          <Link to="/mypage" className="profile">
            <img src={Avartar} alt="user profile" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default HeaderUser;
