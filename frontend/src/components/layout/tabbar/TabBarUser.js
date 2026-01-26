import { NavLink } from 'react-router-dom';

import HomeIcon from '../../../assets/icon-home.svg';
import SearchIcon from '../../../assets/icon-search.svg';
import UploadIcon from '../../../assets/icon-plus.svg';
import BellIcon from '../../../assets/icon-bell.svg';
import UserIcon from '../../../assets/icon-user.svg';
import '../../styles/tabbar.scss';

const TabBarUser = () => {
  return (
    <nav className="tabbar user">
      <NavLink to="/" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <img src={HomeIcon} alt="홈" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <img src={SearchIcon} alt="검색" />
        <span>Search</span>
      </NavLink>

      <NavLink to="/upload" className={({ isActive }) => isActive ? 'tab-item upload active' : 'tab-item upload'} end>
        <img src={UploadIcon} alt="업로드" />
        <span>Upload</span>
      </NavLink>

      <NavLink to="/alarm" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <img src={BellIcon} alt="알림" />
        <span>Alarm</span>
      </NavLink>

      <NavLink to="/mypage" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <img src={UserIcon} alt="마이페이지" />
        <span>Mypage</span>
      </NavLink>
    </nav>
  );
};

export default TabBarUser;
