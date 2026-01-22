import React from 'react';
import '../styles/common.css';
import Logowhite from '../../assets/Logo_white.svg';


function Footer(props) {
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <ul>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>공지사항</li>
          </ul>
          <p>CopyRight PING. 2025 All Right Reserved.</p>
        </div>
        <div className='footer-logo'>
          <img src={Logowhite} alt="핑로고" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;