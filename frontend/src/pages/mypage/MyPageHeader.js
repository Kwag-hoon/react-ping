import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconEmail from '../../assets/icon-mail.svg';
import IconEdit2 from '../../assets/icon-edit-2.svg';

const MyPageHeader = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:9070/users/mypage", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ 전체 데이터 그대로 저장
        setProfile(res.data);

      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="mypage-header">불러오는 중...</div>;

  return (
    <section className="mypage-header">
      <div className="profile-left">
        <div className="avatar">
          <img
            src={
              profile.user_image
                ? `http://localhost:9070${profile.user_image}`
                : "https://i.pravatar.cc/150?img=32"
            }
            alt="profile"
          />
        </div>
      </div>

      <div className="profile-right">
        <div className="name-row">
          <h2>{profile.user_nickname}</h2>
          <span className="badge">{profile.user_grade}</span>
        </div>

        <p className="job">{profile.user_intro || "아직 소개가 없어요"}</p>

        <div className="info-row">
          <div className="info-item">
            <span className="icon">
              <img src={IconEmail} alt="이메일" />
            </span>
            <span>{profile.user_id}</span>
          </div>

          <div className="info-item">
            <span className="icon">
              <img src={IconEdit2} alt="가입일" />
            </span>
            <span>{profile.create_datetime?.slice(0, 10)}</span>
          </div>
        </div>
      </div>

      <div className="profile-action"></div>
    </section>
  );
};

export default MyPageHeader;
