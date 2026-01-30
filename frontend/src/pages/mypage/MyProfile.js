import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from '../auth/Select';


function MyProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ======================
  // form state
  // ======================

  const [form, setForm] = useState({
    user_id: "",
    user_nickname: "",
    user_intro: "",
    user_grade: "GENERAL",

    // 비밀번호 (선택)
    current_pw: "",
    new_pw: "",
    new_pw_confirm: "",
  });

  const [originForm, setOriginForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ======================
  // ENUM 매핑
  // ======================
  const gradeMap = {
    "0~3년": "GENERAL",
    "3~7년": "BASIC",
    "7년 이상": "PRO",
    "GENERAL": "GENERAL",
    "BASIC": "BASIC",
    "PRO": "PRO",
  };

  // ======================
  // 최초 데이터 로드
  // ======================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ 여기로 이동

        const res = await axios.get("http://localhost:9070/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm(prev => ({
          ...prev,
          user_id: res.data.user_id,
          user_nickname: res.data.user_nickname,
          user_intro: res.data.user_intro || "",
          user_grade: res.data.user_grade,
        }));

        setOriginForm({
          user_nickname: res.data.user_nickname,
          user_intro: res.data.user_intro || "",
          user_grade: res.data.user_grade,
        });
      } catch (err) {
        console.error(err);
        setError("프로필 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ======================
  // 공통 change
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleGradeSelect = (value) => {
    setForm(prev => ({
      ...prev,
      user_grade: gradeMap[value] || "GENERAL",
    }));
  };
  const labelByGrade = {
    GENERAL: "0~3년",
    BASIC: "3~7년",
    PRO: "7년 이상",
  };
  // ======================
  // 변경 여부 체크
  // ======================
  const isChanged = () => {
    if (!originForm) return false;

    const baseChanged =
      form.user_nickname !== originForm.user_nickname ||
      form.user_intro !== (originForm.user_intro || "") ||
      form.user_grade !== originForm.user_grade;

    const pwChanged =
      form.current_pw ||
      form.new_pw ||
      form.new_pw_confirm;

    return baseChanged || pwChanged;
  };

  // ======================
  // submit
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_nickname.trim()) {
      return setError("닉네임을 입력해 주세요.");
    }

    // 비밀번호 변경 검증 (선택)
    if (form.current_pw || form.new_pw || form.new_pw_confirm) {
      if (!form.current_pw) {
        return setError("현재 비밀번호를 입력해 주세요.");
      }
      if (!form.new_pw) {
        return setError("새 비밀번호를 입력해 주세요.");
      }
      if (form.new_pw !== form.new_pw_confirm) {
        return setError("새 비밀번호 확인이 일치하지 않습니다.");
      }
    }

    try {
      const payload = {
        user_nickname: form.user_nickname.trim(),
        user_intro: form.user_intro,
        user_grade: form.user_grade,
      };

      // 비밀번호 입력 시만 전송
      if (form.new_pw) {
        payload.current_pw = form.current_pw;
        payload.new_pw = form.new_pw;
      }

      await axios.put("http://localhost:9070/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("프로필이 수정되었습니다.");
      navigate("/mypage");

    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        "프로필 수정에 실패했습니다."
      );
    }
  };

  // ======================
  // 취소
  // ======================
  const handleCancel = () => {
    navigate(-1);
  };
  const handleWithdraw = async () => {
    const ok = window.confirm("정말 회원탈퇴 하시겠어요? 이 작업은 되돌릴 수 없어요.");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:9070/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 로그인 정보 정리
      localStorage.removeItem("token");
      // setUser(null) 같은 전역 유저 상태가 있다면 여기서 같이 초기화

      alert("회원탈퇴가 완료되었습니다.");
      navigate("/"); // 또는 "/login"
    } catch (err) {
      console.error(err);
      alert("회원탈퇴 실패: 토큰 만료/서버 오류일 수 있어요.");
    }
  };
  if (loading) return <p>로딩중...</p>;

  // ======================
  // render
  // ======================
  return (
    <section className="mypage_section container auth">
      <div className="grid">
        <div className="col-4">
          <h2>프로필 수정</h2>

          {error && <p className="form-error">{error}</p>}

          <form onSubmit={handleSubmit} className="join_form">

            {/* 아이디 */}
            <div className="form-group">
              <label>아이디</label>
              <input type="text" value={form.user_id} disabled />
            </div>

            {/* 닉네임 */}
            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                name="user_nickname"
                value={form.user_nickname}
                onChange={handleChange}
              />
            </div>

            {/* 자기소개 */}
            <div className="form-group">
              <label>자기소개</label>
              <input
                type="text"
                name="user_intro"
                value={form.user_intro}
                onChange={handleChange}
              />
            </div>

            {/* 경력 */}
            <div className="form-group">
              <label>경력</label>
              <Select
                placeholder="경력을 선택하세요"
                options={["0~3년", "3~7년", "7년 이상"]}
                defaultValue={labelByGrade[form.user_grade]}
                onChange={handleGradeSelect}
              />
            </div>

            <hr />

            {/* 비밀번호 변경 */}
            <h4>비밀번호 변경 (선택)</h4>

            <div className="form-group">
              <label>현재 비밀번호</label>
              <input
                type="password"
                name="current_pw"
                value={form.current_pw}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>새 비밀번호</label>
              <input
                type="password"
                name="new_pw"
                value={form.new_pw}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                name="new_pw_confirm"
                value={form.new_pw_confirm}
                onChange={handleChange}
              />
            </div>

            {/* 버튼 */}
            <div className="btn-group">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                취소
              </button>
              <button type="submit" disabled={!isChanged()}>
                수정하기
              </button>
            </div>

          </form>

          {/* 회원 탈퇴 */}
          <div className="danger-zone">
            <h4>회원 탈퇴</h4>
            <p>탈퇴 시 모든 정보는 삭제되며 복구할 수 없습니다.</p>
            <button type="button" className="btn-danger" onClick={handleWithdraw}>
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
