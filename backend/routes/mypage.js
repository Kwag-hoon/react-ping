// routes/mypage.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

const JWT_SECRET = "ping_secret_key";
const SALT_ROUNDS = 10;

// ======================
// JWT 인증 미들웨어 (Bearer 토큰)
// 로그인 유무
// ======================
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "토큰 없음" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "토큰 형식 오류" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("[AUTH] token 검증 실패:", err.message);
    return res.status(401).json({ message: "토큰 검증 실패" });
  }
}

// ======================
// 1) 마이페이지용 프로필 조회
// GET /users/mypage
// ======================
router.get("/mypage", requireAuth, (req, res) => {
  const { user_no } = req.user;

  db.query(
    `
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
    `,
    [user_no],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "회원 조회 실패" });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: "회원 정보 없음" });
      }
      return res.json(rows[0]);
    }
  );
});

// ======================
// 2) 프로필 수정 + 비번 변경
// PUT /users/profile
// ======================
router.put("/profile", requireAuth, async (req, res) => {
  const { user_no } = req.user;

  const {
    user_nickname,
    user_intro,
    user_grade,
    current_pw, 
    new_pw,    
  } = req.body;

  if (!user_nickname || !user_nickname.trim()) {
    return res.status(400).json({ message: "닉네임은 필수입니다." });
  }

  try {
    // 1) 현재 유저 정보 가져오기 (비밀번호 확인)
    db.query(
      "SELECT user_pw FROM pin_users WHERE user_no = ?",
      [user_no],
      async (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "DB 오류" });
        }
        if (rows.length === 0) {
          return res.status(404).json({ message: "회원 정보 없음" });
        }

        let newHashedPw = null;

        // 2) 비밀번호 변경 요청이 들어온 경우만 비번 해싱
        if (new_pw) {
          if (!current_pw) {
            return res.status(400).json({ message: "현재 비밀번호를 입력해 주세요." });
          }

          const isMatch = await bcrypt.compare(current_pw, rows[0].user_pw);
          if (!isMatch) {
            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
          }

          newHashedPw = await bcrypt.hash(new_pw, SALT_ROUNDS);
        }

        // 3) 업데이트 쿼리 
        const fields = [];
        const values = [];

        fields.push("user_nickname = ?");
        values.push(user_nickname.trim());

        fields.push("user_intro = ?");
        values.push(user_intro || null);

        fields.push("user_grade = ?");
        values.push(user_grade || "GENERAL");

        if (newHashedPw) {
          fields.push("user_pw = ?");
          values.push(newHashedPw);
        }

        values.push(user_no);

        db.query(
          `
          UPDATE pin_users
          SET ${fields.join(", ")}
          WHERE user_no = ?
          `,
          values,
          (err2) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ message: "프로필 수정 실패" });
            }
            return res.json({ success: true });
          }
        );
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
