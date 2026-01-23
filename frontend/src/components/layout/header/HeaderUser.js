import { Link } from 'react-router-dom';

// 핑 로고(svg) 가져오기
import Logogray from '../../../assets/Logo_gray.svg';
import '../../styles/common.css';




function HeaderUser(props) {
  return (
    <div className="header user">
      <div className="header-wrapper">
        <h1><Link to="/" ><img src={Logogray} alt="핑로고" /></Link></h1>
        <div></div>


        <nav>
          <ul>
            <li><Link to="/archive">Archive</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HeaderUser;
