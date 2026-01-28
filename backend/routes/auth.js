// 로그인 / 회원가입 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();
const SALT_ROUNDS = 10;


// 회원가입
// POST /users/signup
router.post('/signup', async (req, res) => {
  const {
    user_id,
    user_pw,
    user_nickname,
    user_intro,
    user_grade,
  } = req.body;

  // 필수값 체크
  if (!user_id || !user_pw || !user_nickname) {
    return res.status(400).json({
      message: '아이디, 비밀번호, 닉네임은 필수입니다.',
    });
  }

  try {
    // 아이디 중복 체크
    db.query(
      'SELECT user_no FROM pin_users WHERE user_id = ?',
      [user_id],
      async (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: 'DB 오류 (아이디 중복 체크)',
          });
        }

        if (rows.length > 0) {
          return res.status(409).json({
            message: '이미 사용 중인 아이디입니다.',
          });
        }

        // 비밀번호 해시
        const hashedPw = await bcrypt.hash(user_pw, SALT_ROUNDS);

        // 회원 저장
        db.query(
          `
          INSERT INTO pin_users
          (user_id, user_pw, user_nickname, user_intro, user_grade, user_role)
          VALUES (?, ?, ?, ?, ?, 'USER')
          `,
          [
            user_id,
            hashedPw,
            user_nickname,
            user_intro || null,
            user_grade || 'GENERAL',
          ],
          (err2) => {
            if (err2) {
              console.error(err2);

              // 닉네임 중복
              if (err2.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                  message: '이미 사용 중인 닉네임입니다.',
                });
              }

              return res.status(500).json({
                message: '회원가입 실패',
              });
            }

            return res.json({
              success: true,
              message: '회원가입 성공',
            });
          }
        );
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: '서버 오류',
    });
  }
});

// 로그인
// POST /users/login
router.post('/login', (req, res) => {
  const { user_id, user_pw } = req.body;

  if (!user_id || !user_pw) {
    return res.status(400).json({
      message: '아이디와 비밀번호를 입력해 주세요.',
    });
  }

  db.query(
    'SELECT * FROM pin_users WHERE user_id = ?',
    [user_id],
    async (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'DB 오류',
        });
      }

      if (rows.length === 0) {
        return res.status(401).json({
          message: '아이디 또는 비밀번호 오류',
        });
      }

      const user = rows[0];

      // 비밀번호 비교
      const isMatch = await bcrypt.compare(user_pw, user.user_pw);
      if (!isMatch) {
        return res.status(401).json({
          message: '아이디 또는 비밀번호 오류',
        });
      }

      // JWT payload (최소 정보)
      const payload = {
        user_no: user.user_no,
        user_role: user.user_role,
        user_grade: user.user_grade,
      };

      // JWT 발급 (env 없이 고정 키)
      const token = jwt.sign(
        payload,
        'ping_secret_key',
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          user_no: user.user_no,
          user_id: user.user_id,
          user_nickname: user.user_nickname,
          user_grade: user.user_grade,
          user_role: user.user_role,
        },
      });
    }
  );
});

// 로그인 유지 + 내 정보 조회
router.get('/me', auth, (req, res) => {
  const { user_no } = req.user;

  const sql = `
    SELECT
      user_no,
      user_id,
      user_nickname,
      user_intro,
      user_image,
      user_banner,
      user_grade,
      user_role,
      create_datetime
    FROM pin_users
    WHERE user_no = ?
  `;

  db.query(sql, [user_no], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '회원 조회 실패' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: '회원 정보 없음' });
    }

    res.json(result[0]);
  });
});

module.exports = router;