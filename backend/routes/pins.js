const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ping_secret_key';
const router = express.Router();

router.post('/', (req, res) => {
  const { postNo, imageNo, x, y, question, issue } = req.body;

  // 🔐 토큰 검사
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

  // ✅ 유효성 검사
  if (!postNo || !imageNo || x == null || y == null || !question || !issue) {
    return res.status(400).json({ message: '핀 데이터 부족' });
  }

  /* =========================
     1️⃣ 핀 질문 저장
     ========================= */
  const insertPinSql = `
    INSERT INTO pin_questions
    (post_no, image_no, user_no, x, y, question_content)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertPinSql,
    [postNo, imageNo, userNo, x, y, question],
    (err, result) => {
      if (err) {
        console.error('❌ pin_questions insert error:', err);
        return res.status(500).json({ message: '핀 저장 실패' });
      }

      const pinNo = result.insertId; // ✅ 오타 수정

      /* =========================
         2️⃣ 카테고리 번호 조회
         ========================= */
      const selectCategorySql = `
        SELECT category_no
        FROM pin_categories
        WHERE category_name = ?
      `;

      db.query(selectCategorySql, [issue], (err, rows) => {
        if (err || rows.length === 0) {
          console.error('❌ category select error:', err);
          return res.status(500).json({ message: '카테고리 조회 실패' });
        }

        const categoryNo = rows[0].category_no;

        /* =========================
           3️⃣ 핀-카테고리 연결
           ========================= */
        const insertPinCategorySql = `
          INSERT INTO pin_question_categories
          (pin_no, category_no)
          VALUES (?, ?)
        `;

        db.query(
          insertPinCategorySql,
          [pinNo, categoryNo],
          (err) => {
            if (err) {
              console.error('❌ pin_question_categories insert error:', err);
              return res.status(500).json({ message: '핀 카테고리 저장 실패' });
            }

            res.json({
              success: true,
              pinNo,
            });
          }
        );
      });
    }
  );
});

module.exports = router;
