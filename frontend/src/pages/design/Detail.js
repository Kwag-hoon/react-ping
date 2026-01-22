import '../styles/archive.scss'
import React from 'react';
import { Link } from 'react-router-dom';

function Detail() {

  return (
    <section className="detail container">
      <article className="detail_box grid">
        <div className='detail-box_left col-8'>
          <Link to="/" title="">뒤로 가기</Link>
          <h2>모바일 뱅킹 앱</h2>

          <div class="desc-row">
            <p>거래 화면에 대한 다양한 접근 방식 탐색</p>
            <span class="user-badge">
              <img
                src={`${process.env.PUBLIC_URL}/images/detail.png`}
                alt="프로필 이미지"
              />
              <strong>김서연</strong>
            </span>
          </div>

          <ul className="badge-btn">
            <li>모바일</li>
            <li>뱅킹</li>
            <li>UX</li>
          </ul>
          <div className="img_box">
            <img src={`${process.env.PUBLIC_URL}/images/detail.png`} alt="상세페이지 이미지" />
          </div>
        </div>

        <div className="detail-box_right col-4">

          <p class="pin-label">
            <span class="pin-badge">1</span>
            Pin Question
          </p>

          <hr />
          <span>카드 스타일 레이아웃과 전체 화면 디자인 중 어느것이 더 나을까요? 사용자에게 주는 느낌이 다를 것 같은데 의견이 필요합니다.</span>
          <hr />

          <div className='box-right_card'>
            <ul>
              <li>Community Replies <span>(2)</span></li>
              <li>
                <strong>최현우</strong>
                <br />
                <span>1월 14일</span>
                <br />
                카드 형식이 좋습니다. 사용자를 압도하지 않으면서 거래 세부사항에 집중할 수 있고, 중요한 정보를 "들어 올리는" 멘탈 모델을 만들어줍니다.
              </li>
              <li>
                <strong>최현우</strong>
                <br />
                <span>1월 14일</span>
                <br />
                전체 화면 전환보다 액션이 덜 영구적이고 덜 무섭게 느껴지는 것도 장점입니다.
              </li>
            </ul>

            <textarea className="card-box"
              placeholder='공개 댓글을 작성하세요' />

            <button type='submit'>댓글 게시</button>
            <hr />
          </div>

          <div className='box-right_memo'>
            <p>My Memo(Private)</p>
            <span>이 메모는 오직 당신만 볼 수 있습니다.</span>
            <textarea className="card-box" placeholder='이 질문에 대한 당신의 개인적인 생각을 작성하세요' />
            <button>메모 저장</button>
          </div>

        </div>
      </article>
    </section>
  )
}

export default Detail;