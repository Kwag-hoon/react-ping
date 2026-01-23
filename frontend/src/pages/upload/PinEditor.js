import React, { useRef, useState } from 'react';
import '../styles/pinEditor.scss';


function PinEditor() {
  // 변수 선언 
  const [pins, setPins] = useState([]);
  const [activePinId, setActivePinId] = useState(null);
  const stageRef = useRef(null);
  const imgRef = useRef(null);

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
    question:'',
    issues:[],
  };

  setPins(prev=>[...prev, newPin]);
  setActivePinId(newPin.id);
};

// 핀 삭제 함수 
const handleDeletePin = () => {
  if (!activePinId) return;

  const ok = window.confirm('이 핀을 삭제할까요?');
  if (!ok) return;

  setPins(prev => prev.filter(pin => pin.id !== activePinId));
  setActivePinId(null);
};
  return (
    <main className="pineditor">

      {/* 전체 래퍼 */}
      <div className="pineditor_root">

        {/* 상단 영역 */}
        <header className="pineditor_header">
          <div className="p_header_inner">

            <div className="p_header_left">
              <button className="p_header_back">
                ←
              </button>

              <div className="p_header_title">
                <h1 className="p_title_text">게시물 제목</h1>
                <p className="p_title_sub">{pins.length}개의 핀</p>
              </div>
            </div>

            <div className="p_header_right">
              <div className="zoom_controls">
                <button>-</button>
                <span>100%</span>
                <button>+</button>
              </div>

              <button className="btn_save">저장</button>
              <button className="btn_complete" disabled>
                완료
              </button>
            </div>

          </div>
        </header>

        {/* 본문 */}
        <div className="pineditor_body">

          {/* 좌측 캔버스 */}
          <section className="pineditor_canvas">
            <div className="canvas_outer">
              <div className="canvas_stage">
                <div className="canvas_image_wrap">
                  <img
                    ref={imgRef}
                    src={`${process.env.PUBLIC_URL}/images/hero.png`}
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
          <aside className="pineditor_sidebar">

            {/* 사이드바 헤더 */}
              <div className="sidebar_header">
                <div className="sidebar_header_left">
                  <h2>Pin Question</h2>
                  <p>선택된 핀</p>
                </div>

                {activePinId && (
                  <button
                    type="button"
                    className="btn_pin_delete"
                    onClick={handleDeletePin}
                  >
                    삭제
                  </button>
                )}
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
            <button
              className="btn_submit"
              disabled={!activePin || !activePin.question.trim()}
            >
              핀 저장
            </button>
          </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default PinEditor;