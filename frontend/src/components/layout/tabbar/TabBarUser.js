import { Link } from 'react-router-dom';

import HomeIcon from '../../../assets/icon-home.svg';
import SearchIcon from '../../../assets/icon-search.svg';
import UploadIcon from '../../../assets/icon-plus.svg';
import BellIcon from '../../../assets/icon-bell.svg';
import UserIcon from '../../../assets/icon-user.svg';

const TabBarUser = () => {
  return (
    <nav className="tabbar user">
      <Link to="/" className="tab-item">
        <img src={HomeIcon} alt="홈" />
        <span>Home</span>
      </Link>

      <Link to="/search" className="tab-item">
        <img src={SearchIcon} alt="검색" />
        <span>Search</span>
      </Link>

      <Link to="/upload" className="tab-item upload">
        <img src={UploadIcon} alt="업로드" />
        <span>Upload</span>
      </Link>

      <Link to="/alarm" className="tab-item">
        <img src={BellIcon} alt="알림" />
        <span>Noti</span>
      </Link>

      <Link to="/mypage" className="tab-item">
        <img src={UserIcon} alt="마이페이지" />
        <span>Mypage</span>
      </Link>
    </nav>
  );
};

export default TabBarUser;
