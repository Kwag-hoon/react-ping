import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.scss';
import Select from './Select';
import eye from "../../assets/icon-eye.svg";

function Login(props) {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    user_pw: "",
    user_pw_confirm: "",
    user_grade: "GENERAL",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleGradeSelect = (selectedLabel) => {
    setForm(prev => ({ ...prev, user_grade: selectedLabel || "GENERAL" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.user_id.trim()) return setError("아이디를 입력해 주세요.");
    if (!form.user_pw) return setError("비밀번호를 입력해 주세요.");
    if (form.user_pw !== form.user_pw_confirm) return setError("비밀번호 확인이 달라요.");

    try {
      const payload = {
        user_id: form.user_id.trim(),
        user_pw: form.user_pw,
        user_grade: form.user_grade,
      };

      const res = await axios.post("http://localhost:9070/users/signup", payload);

      console.log("회원가입 성공:", res.data);
      alert("회원가입 완료!");

    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "회원가입 실패. 아이디 중복/서버 오류."
      );
    }
  };

  return (
    <section className='signup_section container auth'>
      <div className="grid">
        <div className="col-4 ">
          <h2>JOIN</h2>

          <div className="divider">
            <span>SNS로 가입하기</span>
          </div>

          <ul className="social-login">
            <li><Link to="/auth/naver"><img src={process.env.PUBLIC_URL + '/images/naver.jpg'} alt="네이버" /></Link></li>
            <li><Link to="/auth/kakao"><img src={process.env.PUBLIC_URL + '/images/kakao.jpg'} alt="카카오" /></Link></li>
            <li><Link to="/auth/google"><img src={process.env.PUBLIC_URL + '/images/google.jpg'} alt="구글" /></Link></li>
          </ul>

          <div className="divider">
            <span>이메일로 가입하기</span>
          </div>

          {error && <p className="form-error">{error}</p>}

          <form className='join_form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                name="user_id"
                id="id"
                placeholder='아이디를 입력하세요.'
                value={form.user_id}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="password">비밀번호</label>

              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}
                  name="user_pw"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
                  value={form.user_pw}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onMouseDown={() => setShow(true)}
                  onMouseUp={() => setShow(false)}
                  onMouseLeave={() => setShow(false)}
                  onTouchStart={() => setShow(true)}
                  onTouchEnd={() => setShow(false)}
                >
                  <img src={eye} alt="eye" className="eye" />
                </button>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor="passwordConfirm">비밀번호 확인</label>

              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}
                  name="user_pw_confirm"
                  id="passwordConfirm"
                  placeholder="비밀번호를 입력하세요."
                  value={form.user_pw_confirm}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onMouseDown={() => setShow(true)}
                  onMouseUp={() => setShow(false)}
                  onMouseLeave={() => setShow(false)}
                  onTouchStart={() => setShow(true)}
                  onTouchEnd={() => setShow(false)}
                >
                  <img src={eye} alt="eye" className="eye" />
                </button>
              </div>
            </div>

            <div className='form-group'>
              <label>회원 등급</label>
              <Select
                placeholder="등급을 선택하세요"
                options={["GENERAL", "BASIC", "PRO"]}
                onChange={handleGradeSelect}
              />
            </div>

            <button type="submit">회원 가입</button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Login;
