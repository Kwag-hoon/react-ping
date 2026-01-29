const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ping_secret_key';
const router = express.Router();

// 핀 저장 API
// router.post('/', (req, res) => {

//   const { postNo, imageNo, pins } = req.body;

//   if (!postNo || !imageNo || !pins) {
//     return res.status(400).json({ message: '필수 값 누락' });
//   }

//   const insertPinSql = `
//     INSERT INTO pin_questions
//     (post_no, image_no, user_no, x, y, question_content)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   // 여러 핀 저장
//   pins.forEach((pin) => {
//     db.query(
//       insertPinSql,
//       [
//         postNo,
//         imageNo,
//         1,              // 임시 user_no
//         pin.x,
//         pin.y,
//         pin.question,
//       ],
//       (err) => {
//         if (err) {
          
//           console.error('핀 저장 실패:', err);
//         }
//       }
//     );
//   });

//   res.json({ success: true });
// });

router.post('/', (req, res) => {
  const { postNo, imageNo, pins } = req.body;

  // 1️⃣ 토큰에서 user_no 추출
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: '로그인 필요' });
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: '토큰 오류' });
  }

  const userNo = decoded.user_no;

  // 2️⃣ 유효성 검사
  if (!postNo || !imageNo || !pins || pins.length === 0) {
    return res.status(400).json({ message: '핀 데이터 부족' });
  }

  // 3️⃣ INSERT 쿼리
  
  const insertSql = `
    INSERT INTO pin_questions
    (post_no, image_no, user_no, x, y, question_content)
    VALUES ?
  `;

  const values = pins.map(pin => [
    postNo,
    imageNo,
    userNo,
    pin.x,
    pin.y,
    pin.question, // ⭐ question → question_content
  ]);

  db.query(insertSql, [values], (err, result) => {
    if (err) {
      console.error('❌ pin_questions insert error:', err);
      return res.status(500).json({ message: '핀 저장 실패' });
    }

    res.json({ success: true });
  });
});

module.exports = router;
