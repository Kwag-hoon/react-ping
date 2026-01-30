import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pinEditor.scss';
import axios from 'axios';
import left from '../../assets/icon-chevron-left.svg'

function PinEditor() {
  // 변수 선언 
  const [pins, setPins] = useState([]);
  const [activePinId, setActivePinId] = useState(null);
  // 린 const stageRef = useRef(null);
  const imgRef = useRef(null);
  const [post, setPost] = useState(null); //린

  //린_ useNavigate상태변수
  const navigate = useNavigate();
  //린
  const location = useLocation();
  const { postNo, imageNo, imagePath } = location.state || {};

  //린
  useEffect(() => {
    if (!postNo) return;

    axios.get(
      `http://localhost:9070/api/designs/${postNo}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then(res => {
        setPost(res.data);
      })
      .catch(err => console.error(err))
  }, [postNo]);

  // 린_핀 저장함수 만들기
  // const savePinsToServer = async () => {
  //   try {
  //     const cleanedPins = pins.map(pin => ({
  //       x: pin.x,
  //       y: pin.y,
  //       question: pin.question,
  //     }));

  //     const res = axios.post(
  //       'http://localhost:9070/api/pins',
  //       {
  //         postNo,
  //         imageNo,
  //         pins: cleanedPins, // ✅ 정제된 데이터만 전송
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );
  //     console.log('핀 저장 성공: ', res.data);
  //     alert('핀 저장 완료');
  //   } catch (err) {
  //     console.err('핀 저장 실패 :', err)
  //   }
  // };
  const savePinsToServer = async () => {
    if (!activePin) return;

    const payload = {
      postNo,
      imageNo,
      x: activePin.x,
      y: activePin.y,
      question: activePin.question,
    };

    try {
      await axios.post(
        'http://localhost:9070/api/pins',
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('핀 저장 완료');
    } catch (err) {
      console.error(err);
    }
  };

  //린_저장 버튼
  // const handleSave = async () => {
  //   try {
  //     await savePinsToServer();
  //     alert('임시 저장 완료');
  //   } catch (err) {
  //     console.error(err);
  //     alert('저장 실패');
  //   }
  // };

  // 핀 삭제 함수 
  const handleDeletePin = () => {
    if (!activePinId) return;

    const ok = window.confirm('이 핀을 삭제할까요?');
    if (!ok) return;

    setPins(prev => prev.filter(pin => pin.id !== activePinId));
    setActivePinId(null);
  };

  const hasPin = pins.length > 0;
  const activePin = pins.find(pin => pin.id === activePinId);

  // 핀 찍는 핵심 로직 
  const handleAddPin = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const clickX = e.clientX;
    const clickY = e.clientY;

    const x = ((clickX - rect.left) / rect.width) * 100;
    const y = ((clickY - rect.top) / rect.height) * 100;

    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    const newPin = {
      id: Date.now(),
      x,
      y,
      question: '',
      issues: [],
    };

    setPins(prev => [...prev, newPin]);
    setActivePinId(newPin.id);
  };

  //린_완료 버튼
  const handleComplete = async () => {
    if (!postNo) {
      alert('게시물 정보가 없습니다.');
      return;
    }

    if (pins.length === 0) {
      alert('최소 1개의 핀을 추가하세요.');
      return;
    }

    try {
      await savePinsToServer();
      navigate(`/detail/${postNo}`);
    } catch (err) {
      console.error(err);
      alert('완료 처리 실패');
    }
  };

  return (
    <main className="pineditor container">

      {/* 전체 래퍼 */}
      <div className="grid pineditor_root">
        {/* 상단 영역 */}
        <div className="pineditor_header col-12">
          {/* <div className="p_header_inner"> */}

          <div className="p_header_left">
            <button className="p_header_back">
              <img src={left} alt="왼쪽화살표" />
              <span>뒤로</span>
            </button>

            <div className="p_header_title">
              <h1 className="p_title_text">
                {post?.post_title || '게시물 제목'}
              </h1>
              <p className="p_title_sub">{pins.length}개의 핀</p>
            </div>
          </div>

          <div className="p_header_right">
            {/* <div className="zoom_controls">
              <button><img src={minusIcon} alt="마이너스" /></button>
              <span>100%</span>
              <button><img src={plusIcon} alt="플러스" /></button>
            </div> */}

            {/* <button
              className="btn_save"
              onClick={handleSave} //린
            >
              저장
            </button> */}
            {/* <button
              className="btn_complete"
              onClick={handleComplete} //린
              disabled={pins.length === 0} //린
            >
              완료
            </button> */}
          </div>
        </div>


        {/* 본문 */}
        {/* <div className="pineditor_body"> 하영씨*/}

        <div className="col-12">
          <div className="grid">
            {/* 좌측 캔버스 */}
            <section className="pineditor_canvas col-8">
              <div className="canvas_outer">
                <div className="canvas_stage">
                  <div className="canvas_image_wrap">
                    <img
                      ref={imgRef}
                      // src={`${process.env.PUBLIC_URL}/images/hero.png`}
                      src={`http://localhost:9070${imagePath}`}
                      alt="업로드 이미지"
                      className="canvas_image"
                      draggable={false}
                      onClick={handleAddPin}
                    />

                    {pins.map((pin, index) => (
                      <div
                        key={pin.id}
                        className={`pin_marker ${pin.id === activePinId ? 'active' : ''}`}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePinId(pin.id);
                        }}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 우측 사이드바 */}
            <aside className="pineditor_sidebar col-4">

              {/* 사이드바 헤더 */}
              <div className="sidebar_header">
                <h2>Pin Question</h2>
                <div className="sidebar_header_bottom">
                  <p>선택된 핀</p>
                  {activePinId && (
                    <div className="btns">
                      <button
                        className="btn_save"
                        disabled={!activePin || !activePin.question.trim()}
                        onClick={savePinsToServer}>
                        임시 저장
                      </button>
                      <button
                        type="button"
                        className="btn_pin_delete"
                        onClick={handleDeletePin}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 사이드바 컨텐츠 */}
              <div className="sidebar_content">

                {/* 핀 찍기 전 가이드 */}
                {!hasPin && (
                  <div className="pineditor_guide">
                    <p>이미지 위에 핀을 찍어</p>
                    <p>질문 위치를 선택하세요</p>
                  </div>
                )}

                {/* 핀 찍은 후 질문 폼 */}
                {hasPin && activePin && (
                  <>
                    <div className="form_group">
                      <label>질문 *</label>
                      <textarea
                        placeholder="이 부분에 대해 어떤 피드백이 필요한가요?"
                        value={activePin.question}
                        onChange={(e) => {
                          setPins(prev =>
                            prev.map(pin =>
                              pin.id === activePin.id
                                ? { ...pin, question: e.target.value }
                                : pin
                            )
                          );
                        }}
                      />
                      <p className="form_hint">
                        핀 당 하나의 명확한 질문을 작성하세요
                      </p>
                    </div>

                    <div className="form_group">
                      <div className="form_group_header">
                        <label>문제 유형 *</label>
                        <span className="form_warning">최소 1개 선택</span>
                      </div>

                      <p className="form_desc">
                        이 핀이 어떤 문제와 관련되어 있나요?
                      </p>

                      <div className="tag_box">
                        <button className="tag active">
                          일관성
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </div>


              {/* 사이드바 하단 */}
              <div className="sidebar_footer">
                {/* <button
                  className="btn_submit"
                  disabled={!activePin || !activePin.question.trim()}
                  onClick={savePinsToServer}>
                  핀 저장
                </button> */}
                <button
                  className="btn_submit"
                  onClick={handleComplete} //린
                  disabled={pins.length === 0} //린
                >
                  핀 업로드
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main >
  );
}

export default PinEditor;