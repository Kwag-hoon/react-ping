import React from 'react';
import '../styles/pinEditor.scss';

function PinEditor() {
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
                <p className="p_title_sub">0개의 핀</p>
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

                <img src={`${process.env.PUBLIC_URL}/images/hero.png`} alt="업로드 이미지" className="canvas_image" draggable={false} />
                {/* 퍼블리싱용  임시 핀 */}
                <div
                  className="pin_marker"
                  style={{ left: '64%', top: '45%' }}
                >
                  1
                </div>

              </div>
            </div>
          </section>

          {/* 우측 사이드바 */}
          <aside className="pineditor_sidebar">

            {/* 사이드바 헤더 */}
            <div className="sidebar_header">
              <h2>Pin Question</h2>
              <p>새 핀</p>
            </div>

            {/* 사이드바 컨텐츠 */}
            <div className="sidebar_content">

              <div className="form_group">
                <label>질문 *</label>
                <textarea
                  placeholder="이 부분에 대해 어떤 피드백이 필요한가요?"

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

            </div>

            {/* 사이드바 하단 */}
            <div className="sidebar_footer">
              <button className="btn_submit" disabled>
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