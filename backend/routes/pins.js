const express = require('express');
const db = require('../db');

const router = express.Router(); // ✅ 이 줄이 없어서 에러 난 거야

// 핀 저장 API
router.post('/', (req, res) => {
  const { postNo, imageNo, pins } = req.body;

  if (!postNo || !imageNo || !pins) {
    return res.status(400).json({ message: '필수 값 누락' });
  }

  const insertPinSql = `
    INSERT INTO pin_questions
    (post_no, image_no, user_no, x, y, question_content)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // 여러 핀 저장
  pins.forEach((pin) => {
    db.query(
      insertPinSql,
      [
        postNo,
        imageNo,
        1,              // 임시 user_no
        pin.x,
        pin.y,
        pin.question,
      ],
      (err) => {
        if (err) {
          console.error('핀 저장 실패:', err);
        }
      }
    );
  });

  res.json({ success: true });
});

module.exports = router;
