// components/pages/mypage/MyPageHeader.js
import React from 'react';
import IconEmail from '../../assets/icon-mail.svg'; 
import IconEdit2 from '../../assets/icon-edit-2.svg'; 


const MyPageHeader = () => {
  const handleLogout = () => {
    // 나중에 실제 로그아웃 로직 연결
    alert('로그아웃');
  };
  return (
    <section className="mypage-header">
      {/* 왼쪽 프로필 영역 */}
      <div className="profile-left">
        <div className="avatar">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="profile"
          />
        </div>
      </div>

      {/* 가운데 정보 영역 */}
      <div className="profile-right">
        <div className="name-row">
          <h2>SENA</h2>
          <span className="badge">PRO</span>
        </div>

        <p className="job">UX/UI DESIGNER</p>

        <div className="info-row">
          <div className="info-item">
            <span className="icon"><img src={IconEmail} alt="이메일" /></span>
            <span>abc123@google.com</span>
          </div>

          <div className="info-item">
            <span className="icon"><img src={IconEdit2} alt="가이드" /></span>
            <span>2026.02.20</span>
          </div>
        </div>
      </div>

      {/* 오른쪽 로그아웃 영역 */}
      <div className="profile-action">
      </div>
    </section>
  );
};

export default MyPageHeader;
