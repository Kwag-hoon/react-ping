import '../styles/detail.scss'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '../../assets/icon-chevron-left.svg';
import CloseIcon from '../../assets/icon-x.svg';
import axios from 'axios';

function Detail() {
  // 이미지 위에 표시될 핀 정보 + 각 핀에 대응되는 질문 데이터
  //나중에 핀 업로드에서 가져올때는
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [post, setPost] = useState(null);

  //archive 페이지에서 아이디값 넘겨 받기
  const { id } = useParams();
  // const pins = [
  //   { id: 1, x: 32.5, y: 40.2, question: '카드 스타일 레이아웃과 전체 화면 디자인 중 어느것이 더 나을까요? 사용자에게 주는 느낌이 다를 것 같은데 의견이 필요합니다.' },
  //   { id: 2, x: 61.8, y: 28.4, question: '질문 2' },
  //   { id: 3, x: 48.1, y: 66.9, question: '질문 3' },
  // ];
  // 현재 선택된 핀 상태 (핀을 선택하지 않았을 경우 기본값으로 첫 번째 핀 사용)
  // const [selectedPin, setSelectedPin] = useState(pins[0]);
  // 서버 데이터 로딩
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:9070/api/designs/${id}`)
      .then(res => {
        const serverPins = res.data.pins || [];

        setPins(serverPins);
        setSelectedPin(serverPins[0] || null);
        setImageUrl(res.data.imageUrl || '');
        setPost(res.data.post || null);
      })
      .catch(err => {
        console.error('❌ Detail fetch error:', err);
      });
  }, [id]);

  const navigate = useNavigate();
  //모바일 댓글창 여는 상태변수
  const [isOpen, setIsOpen] = useState(false);

  // 핀 id를 key로 하는 댓글 상태 객체 (각 핀마다 댓글을 분리해서 저장)
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');

  //메모 업로드 상태변수
  const [memo, setMemo] = useState([]);
  const [memoText, setMemoText] = useState('');

  //나중에 PinEditor 서버에서 받을 이미지 데이터 구조
  // const imageUrl = `${process.env.PUBLIC_URL}/images/detail.png`;

  //댓글 게시 버튼 로직
  const handleAddComment = () => {
    if (!selectedPin) return;
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(), //임시 데이터 
      user: '린',     //나중에 로그인 유저로 바꿈
      date: new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      }),
      content: commentText,
    };

    setComments(prev => ({
      ...prev,
      [selectedPin.pin_no]: [
        ...(prev[selectedPin.pin_no] || []),
        newComment,
      ],
    }));
    setCommentText('');
  };

  // comments 객체에서 현재 선택된 핀의 질문
  const pinComments = selectedPin
    ? comments[selectedPin.pin_no] || []
    : [];

  //메모 게시 버튼 로직
  const handleAddMemo = () => {
    if (!memoText.trim()) return;

    const newMemo = {
      id: Date.now(),
      user: '린',
      date: new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      }),
      content: memoText,
    };

    setMemo(prev => [...prev, newMemo]);
    setMemoText('');
  }

  //핀클릭시 모달 메뉴 열기 함수
  const handlePinClick = (pin) => {
    setSelectedPin(pin);

    if (window.innerWidth <= 1023) {
      setIsOpen(true);
    }
  };

  return (
    <section className="detail container">
      <article className="detail_box grid">

        {/* 왼쪽 이미지 박스 */}
        <div className='detail-box_left col-8'>
          <button onClick={() => navigate(-1)} className="back_btn">
            <img src={backIcon} alt='뒤로가기 아이콘' />뒤로 가기
          </button>

          <h2>
            {post?.post_title}
          </h2>

          <div className="desc-row">
            <p>
              {post?.post_content}
            </p>
            <span className="user-badge">
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

          {/* PinEditor와 동일한 핀 구조 */}
          <div className="img_box">
            <div className="image_wrap">
              {imageUrl && (
                <img
                  src={`http://localhost:9070${imageUrl}`}
                  alt="상세페이지 이미지"
                />
              )}

              {pins.map((pin, index) => (
                <div
                  key={pin.id}
                  className={`pin_marker ${selectedPin?.id === pin.id ? 'active' : ''}`}
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                  }}
                  onClick={() => handlePinClick(pin)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>


          {/* 모바일 모달 창 버튼 */}
          <button className="mobile-comment-btn" onClick={() => setIsOpen(true)}>
            질문 / 댓글 보기
          </button>
        </div>

        {/* 오른쪽 댓글창 박스 */}
        <div className="detail-box_right col-4 hidden">
          <div className="sticky-inner">
            <p className="pin-label">
              <span className="pin-badge">
                {selectedPin
                  ? pins.findIndex(p => p.pin_no === selectedPin.pin_no) + 1
                  : '-'}
              </span>
              Pin Question
            </p>

            {/* 선택된 핀 기준으로 질문 표시예정 */}
            <hr />
            <span>
              {selectedPin ? selectedPin.question : '핀을 선택해주세요'}
            </span>
            <hr />

            <div className='box-right_card'>
              <ul>
                <li>Community Replies <span>({pinComments.length})</span></li>
                {pinComments.length === 0 && (
                  <li className='empty'>아직 댓글이 없습니다.</li>
                )}
                {pinComments.map(comment => (
                  <li key={comment.id}>
                    <strong>{comment.user}</strong>
                    <br />
                    <span>{comment.date}</span>
                    <br />
                    {comment.content}
                  </li>
                ))}
              </ul>

              <textarea
                className="card-box"
                placeholder='공개 댓글을 작성하세요'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button type='submit' onClick={handleAddComment}>댓글 게시</button>
              <hr />
            </div>

            <div className='box-right_memo'>
              <p>My Memo(Private)</p>
              <span>이 메모는 오직 당신만 볼 수 있습니다.</span>
              {memo.map(m => (
                <ul key={m.id}>
                  <li>
                    {m.content}<br />
                    <span>{m.date}</span>
                  </li>
                </ul>
              ))}
              <textarea
                className="card-box"
                placeholder='이 질문에 대한 당신의 개인적인 생각을 작성하세요'
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
              />
              <button type='submit' onClick={handleAddMemo}>메모 저장</button>
            </div>
          </div>
        </div>
      </article>

      {/* 1023px이하 전용 모달 영역 */}
      <div className={`modal-dim ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="detail-modal">
            <div className="detail-box_right col-4">
              <div className="sticky-inner">
                <p className="pin-label">
                  <span className="pin-badge">
                    {selectedPin
                      ? pins.findIndex(p => p.pin_no === selectedPin.pin_no) + 1
                      : '-'}
                  </span>
                  Pin Question
                </p>
                <button className="close_btn"
                  onClick={() => setIsOpen(false)}
                >
                  <img src={CloseIcon} alt='닫기 버튼' />
                </button>

                <hr />
                <span>{selectedPin?.question || ''}</span>
                <hr />

                <div className='box-right_card'>
                  <ul>
                    <li>Community Replies <span>({pinComments.length})</span></li>
                    {pinComments.length === 0 && (
                      <li className='empty'>아직 댓글이 없습니다.</li>
                    )}
                    {pinComments.map(comment => (
                      <li key={comment.id}>
                        <strong>{comment.user}</strong>
                        <br />
                        <span>{comment.date}</span>
                        <br />
                        {comment.content}
                      </li>
                    ))}
                  </ul>

                  <textarea
                    className="card-box"
                    placeholder="공개 댓글을 작성하세요"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />

                  <button type='submit' onClick={handleAddComment}>댓글 게시</button>
                  <hr />
                </div>

                <div className='box-right_memo'>
                  <p>My Memo(Private)</p>
                  <span>이 메모는 오직 당신만 볼 수 있습니다.</span>
                  {memo.map(m => (
                    <ul key={m.id}>
                      <li>
                        {m.content}<br />
                        <span>{m.date}</span>
                      </li>
                    </ul>
                  ))}
                  <textarea
                    className="card-box"
                    placeholder='이 질문에 대한 당신의 개인적인 생각을 작성하세요'
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                  />
                  <button type='submit' onClick={handleAddMemo}>메모 저장</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail;