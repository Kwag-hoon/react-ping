import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.scss';

function Login(props) {
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도");
  };

  return (
    <section className='login_section container auth'>
      <div className="grid">
        <div className="col-4 ">
          <h2>LOGIN</h2>

          <ul className="social-login">
            <li><Link to="/auth/naver"><img src={process.env.PUBLIC_URL + '/images/naver.jpg'} alt="네이버" /></Link></li>
            <li><Link to="/auth/kakao"><img src={process.env.PUBLIC_URL + '/images/kakao.jpg'} alt="카카오"/></Link></li>
            <li><Link to="/auth/google"><img src={process.env.PUBLIC_URL + '/images/google.jpg'} alt="구글"/></Link></li>
          </ul>

          <form className='login_form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="id">아이디</label>
              <input type="text" name="id" id="id" placeholder='아이디를 입력하세요.' />
            </div>

            <div className='form-group'>
              <label htmlFor="password">비밀번호</label>

              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}   // ✅ 여기!
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

            <Link to="/find-account">아이디/비밀번호 찾기</Link>
            <button type="submit">로그인</button>
          </form>

          <div className="login_bottom">
            <p>신규 사용자인가요?</p>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
