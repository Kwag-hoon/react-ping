import React, { useState } from 'react';
import qnaData from './qna.json';
import '../styles/qna.scss';

function Question() {
  //질문클릭시 답변 토글
  const [isopen, setIsOpen] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <main className='qna container'>
      <section className='grid'>
        <div className='top-text col-12'>
          <h2>질문과 답변</h2>
          <p>디자인의 맥락을 이해하고, 질문과 답변으로 더 나은 피드백을 만들어가세요.</p>
        </div>

        <div className="qna-table-wrap col-full">
          <table className='qna-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </thead>

            <tbody>
              {qnaData.slice(0, visibleCount).map((item) => (
                <React.Fragment key={item.no}>
                  {/* 질문행 */}
                  <tr
                    className='qna-row'
                    onClick={() =>
                      setIsOpen(isopen === item.no ? null : item.no)
                    }
                  >
                    <td>{item.no}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.date}</td>
                  </tr>

                  {/* 답변행 */}
                  {isopen === item.no && (
                    <tr className='qna-answer-row'>
                      <td colSpan={4}>
                        <div className='qna-answer'>
                          A. {item.answer}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {visibleCount < qnaData.length && (
            <div className='btn_wrapper'>
              <button
                type='btn'
                className='btn_more'
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                더보기
              </button>
            </div>
            )}
        </div>
      </section>
    </main>
  )
}

export default Question;