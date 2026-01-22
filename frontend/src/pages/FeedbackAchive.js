import React from 'react';

function FeedbackAchive(props) {
  return (
    <article className='main_feedback-archive container'>
      <div className="grid">
        <div className="col-12">
          <img src={process.env.PUBLIC_URL + '/images/main_bigpin.png'} alt="" />
          <h2>나만의 피드백 아카이브를 만들어 보세요.</h2>
          <button>디자인 올리기</button>
        </div>
      </div>
    </article>
  );
}

export default FeedbackAchive;