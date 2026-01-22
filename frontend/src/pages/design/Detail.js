import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Detail() {

  return (
    <section className="detail container">
      <article className="detail_box grid">
        <div className='detail-box_left col-8'>
          <Link to="/" title="">뒤로 가기</Link>
          <h2>모바일 뱅킹 앱</h2>
          <p>거래 화면에 대한 다양한 접근 방식 탐색</p>
          <span>김서연</span>
          <ul className="badge-btn">
            <li>모바일</li>
            <li>뱅킹</li>
            <li>UX</li>
          </ul>
          <img src={`${process.env.PUBLIC_URL}/images/detail.png`} alt="상세페이지 이미지" />
        </div>

        <div className="detail-box_right col-4">
          
          <p>Pin Question</p>
          <hr />
          <p>카드 스타일 레이아웃과 전체 화면 디자인 중 어느것이 더 나을까요? 사용자에게 주는 느낌이 다를 것 같은데 의견이 필요합니다.</p>
          <hr />

          <div>
            <ul>
              <li>Community Replies <span>number</span></li>
              <li>card</li>
              <li>card</li>
            </ul>

            <input type="textarea" />
            <button type='submit'>댓글 게시</button>
            <hr />

            <p>My Memo(Private)</p>
            <span>이 메모는 오직 당신만 볼 수 있습니다.</span>
            <input type="textarea" />
            <button>메모 저장</button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default Detail;