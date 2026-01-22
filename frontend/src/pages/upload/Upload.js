import React, { useState } from 'react';
import '../styles/upload.scss';

function Upload(props) {

  // 선택된 문제유형 클래스 변경을 위한 함수 설정 
  const [selectedIssues , setSelectedIssues] = useState([]);

  // 클릭 핸들러 함수 설정 
  const handleIssueClick = (issue) =>{
    // 이미 선택된 경우 -> 해제 
    if(selectedIssues.includes(issue)){
      setSelectedIssues(
        selectedIssues.filter((item)=> item !==issue)
      );
      return;
    }

    // 최대 3개만 선택할수 있게 제한 해주기
    if(selectedIssues.length >= 3){
      alert('최대 3개까지만 선택할 수 있습니다.');
      return;
    }
    // 새로 선택 
    setSelectedIssues([...selectedIssues, issue]);
  }

  return (
    <main className='upload'>
      <section className='container'>
        {/* 상단 타이틀  */}
        <div className="upload__header">
          <h2 className="upload__title">디자인 업로드</h2>
          <p className="upload__sub content">
            작업을 공유하고 커뮤니티로부터 맥락있는 피드백을 받으세요
          </p>
        </div>

        {/* 폼 영역 */}
        <form className="upload_form">
          {/* 이미지 업로드 안내 영역 (드래그 앤 드롭존 ) */}
          <div className="upload_dropzone" role='button' tabIndex={0}>
            <div className="upload_dropzoneInner">
              <div className="upload_icon" aria-hidden="true">(파일 업로드 아이콘 예정 )</div>

              <p className="upload_dropText">
                <strong className="upload_dropStrong">클릭하여 업로드</strong>
                <span>또는 드래그 앤 드롭 </span>
              </p>

              <p className="upload_dropHint">
                PNG, JPG, PDF 형식 최대 500KB
              </p>
            </div>

            {/* 실제 파일 인풋영역 (디자인은 css로 숨김) */}
            <input type="file" className="upload_file" accept='.png,.jpg,.jpeg,.pdf' required/>
          </div>

          {/* 제목 */}
          <div className="upload_field">
            <label htmlFor="title" className='upload_label'>제목</label>
            <input type="text" className="upload_input" id="title" placeholder='디자인에 명확한 제목을 입력하세요' required/>
          </div>

          {/* 설명 */}
          <div className="upload_field">
            <label htmlFor="desc" className="upload_label">설명</label>
            <textarea className="upload_textarea" id='desc' rows={4} placeholder='어떤 문제를 해결하려 하나요? 어떤 피드백을 원하시나요?' required/>
          </div>

          {/* 문제유형 선택 */}
          <div className="upload_field">
            <div className="upload_row">
              <label className="upload_label">문제 유형 선택</label>
              <span className="upload_counter"> {selectedIssues.length} / 3 selected</span>
            </div>

            <p className="upload_helper">
              최대 3개까지 선택하여 어떤 측면의 피드백이 필요한지 알려주세요
            </p>

            <div className="upload_issueBox">
              
              {/* INFORMATION STRUCTURE */}
              <div className="upload_issueGroup">
                <h4 className="upload_groupTitle">INFORMATION STRUCTURE</h4>
                <div className="upload_chips">
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('정보구조') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('정보구조')}
                  >
                    정보구조
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('내비게이션 구조') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('내비게이션 구조')}
                  >
                    내비게이션 구조
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('콘텐츠 조직') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('콘텐츠 조직')}
                  >
                    콘텐츠 조직
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('라벨링') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('라벨링')}
                  >
                    라벨링
                  </button>
                </div>
              </div>

              {/* INTERACTION */}
              <div className="upload_issueGroup">
                <h4 className="upload_groupTitle">INTERACTION</h4>
                <div className="upload_chips">
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('사용자 흐름') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('사용자 흐름')}
                  >
                    사용자 흐름
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('피드백/응답') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('피드백/응답')}
                  >
                    피드백/응답
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('제스처/동작') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('제스처/동작')}
                  >
                    제스처/동작
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('마이크로 인터렉션') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('마이크로 인터렉션')}
                  >
                    마이크로 인터렉션
                  </button>
                </div>
              </div>

              {/* USABILITY*/}
              <div className="upload_issueGroup">
                <h4 className="upload_groupTitle">UASBILITY</h4>
                <div className="upload_chips">
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('접근성') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('접근성')}
                  >
                    접근성
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('가독성') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('가독성')}
                  >
                    가독성
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('오류방지') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('오류방지')}
                  >
                    오류방지
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('일관성') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('일관성')}
                  >
                    일관성
                  </button>
                </div>
              </div>

              {/* VISUAL DESIGN */}
              <div className="upload_issueGroup">
                <h4 className="upload_groupTitle">VISUAL DESIGN</h4>
                <div className="upload_chips">
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('레이아웃/그리드') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('레이아웃/그리드')}
                  >
                    레이아웃/그리드
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('타이포그래피') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('타이포그래피')}
                  >
                    타이포그래피
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('색상 사용') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('색상 사용')}
                  >
                    색상사용
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('여백/간격') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('여백/간격')}
                  >
                    여백/간격
                  </button>
                  <button type="button"
                  className={`upload_chip ${
                      selectedIssues.includes('시각적 위계') ? 'active' : ''
                    }`}
                    onClick={() => handleIssueClick('시각적 위계')}
                  >
                    시각적 위계
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 하단 안내 박스  */}
          <div className="upload_note">
            <h4 className="upload_noteTitle">다음 단계</h4>
            <p className="upload_noteText">
              다음 화면에서 디자인에 핀을 추가하여 피드백이 필요한 부분을 명확이 표시할 수 있습니다. <br />
              핀은 변경 후 수정할 수 없으므로 신중하게 배치하세요
            </p>
          </div>

          {/* 다음 버튼 */}
          <button className="upload_next">
            다음: 핀 설정 및 미리보기 
          </button>
        </form>
      </section>
    </main>
  );
}

export default Upload;