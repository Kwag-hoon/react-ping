import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.scss';
import Select from './Select';

function Login(props) {
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도");
  };

  return (
    <section className='signup_section container auth'>
      <div className="grid">
        <div className="col-4 ">
          <h2>JOIN</h2>
          <div class="divider">
            <span>SNS로 가입하기</span>
          </div>
          <ul className="social-login">
            <li><Link to="/auth/naver"><img src={process.env.PUBLIC_URL + '/images/naver.jpg'} alt="네이버" /></Link></li>
            <li><Link to="/auth/kakao"><img src={process.env.PUBLIC_URL + '/images/kakao.jpg'} alt="카카오" /></Link></li>
            <li><Link to="/auth/google"><img src={process.env.PUBLIC_URL + '/images/google.jpg'} alt="구글" /></Link></li>
          </ul>
          <div class="divider">
            <span>이메일로 가입하기</span>
          </div>

          <form className='join_form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="id">아이디</label>
              <input type="text" name="id" id="id" placeholder='아이디를 입력하세요.' />
            </div>

            <div className='form-group'>
              <label htmlFor="password">비밀번호</label>

              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
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
                  👁
                </button>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor="password">비밀번호 확인</label>

              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
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
                  👁
                </button>
              </div>
            </div>
            <div className='form-group'>
              <label>회원 등급</label>
              <Select
                placeholder="등급을 선택하세요"
                options={["Basic", "Silver", "Gold", "VIP"]}
              />
            </div>
            <div className='form-group'>
              <label>관심 분야</label>
              <Select
                placeholder="관심분야를 선택하세요"
                options={["디자인", "프론트엔드", "마케팅", "기획"]}
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
