// routes/admin.js
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = "ping_secret_key"; // auth.js랑 동일해야 함

// 🔥 이미 정해진 어드민 아이디
const ADMIN_IDS = ["admin", "superadmin"]; // ← 너가 정한 user_id

// ✅ ADMIN만 통과
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "토큰 없음" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "토큰 형식 오류" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.user_role !== "ADMIN") {
      return res.status(403).json({ message: "ADMIN only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "토큰 검증 실패" });
  }
}

// ✅ 이 파일의 모든 API는 ADMIN만
router.use(requireAdmin);

/**
 * GET /admin/users
 * - 회원 목록(필요한 컬럼만)
 */
router.get("/users", (req, res) => {
  db.query(
    `SELECT user_no, user_id, user_nickname, user_intro, user_grade, user_role, create_datetime
     FROM pin_users
     ORDER BY user_no DESC`,
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB 오류" });
      }
      res.json(rows);
    }
  );
});

/**
 * GET /admin/posts
 * - 지금은 posts 테이블명이 확실치 않아서 안전하게 틀만 만들어둠
 * - 너 테이블명/컬럼명에 맞춰 쿼리만 바꾸면 됨
 */
router.get("/posts", (req, res) => {
  const sql = `
    SELECT
      p.post_no AS id,
      p.post_title AS title,
      p.create_datetime AS createdAt,
      COALESCE(u.user_nickname, u.user_id) AS author,
      COUNT(DISTINCT q.pin_no) AS pins,
      COUNT(DISTINCT a.answer_no) AS comments
    FROM pin_posts p
    LEFT JOIN pin_users u ON p.user_no = u.user_no
    LEFT JOIN pin_questions q ON q.post_no = p.post_no
    LEFT JOIN pin_answers a ON a.pin_no = q.pin_no
    GROUP BY p.post_no, p.post_title, p.create_datetime, u.user_nickname, u.user_id
    ORDER BY p.post_no DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB 오류" });
    }
    res.json(rows);
  });
});

/**
 * DELETE /admin/posts/:id
 * - 관련 자식 레코드까지 안전하게 삭제
 */
router.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ message: "유효하지 않은 id" });
  }

  console.log("[DELETE /admin/posts]", { id });

  // 먼저 존재 여부 확인
  db.query(
    "SELECT post_no FROM pin_posts WHERE post_no = ?",
    [id],
    (selErr, rows) => {
      if (selErr) {
        console.error(selErr);
        return res.status(500).json({ message: "게시물 조회 실패" });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "대상 게시물을 찾을 수 없습니다." });
      }

      db.beginTransaction((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "트랜잭션 시작 실패" });
        }

        const steps = [
          {
            sql: `
              DELETE a
              FROM pin_answers a
              JOIN pin_questions q ON a.pin_no = q.pin_no
              WHERE q.post_no = ?
            `,
            params: [id],
          },
          { sql: "DELETE FROM pin_questions WHERE post_no = ?", params: [id] },
          { sql: "DELETE FROM pin_images WHERE post_no = ?", params: [id] },
          { sql: "DELETE FROM pin_post_categories WHERE post_no = ?", params: [id] },
          { sql: "DELETE FROM pin_posts WHERE post_no = ?", params: [id] },
        ];

        const runStep = (i) => {
          if (i >= steps.length) {
            return db.commit((commitErr) => {
              if (commitErr) {
                console.error(commitErr);
                return db.rollback(() => {
                  res.status(500).json({ message: "커밋 실패" });
                });
              }
              return res.json({ success: true });
            });
          }

          const { sql, params } = steps[i];
          db.query(sql, params, (qErr, result) => {
            if (qErr) {
              console.error(qErr);
              return db.rollback(() => {
                res.status(500).json({
                  message: "삭제 실패",
                  step: i,
                  error: qErr.message || String(qErr),
                  code: qErr.code || undefined,
                });
              });
            }

            // 마지막 단계에서 대상 게시물이 없으면 롤백
            if (i === steps.length - 1 && result && result.affectedRows === 0) {
              return db.rollback(() => {
                res.status(404).json({ message: "대상 게시물을 찾을 수 없습니다." });
              });
            }

            runStep(i + 1);
          });
        };

        runStep(0);
      });
    }
  );
});


/**
/**
 * DELETE /admin/issue-types
 * body: { groupName: string, categoryName: string }
 * - pin_category_groups.group_name 와 pin_categories.category_name 기준 삭제
 */
router.delete("/issue-types", (req, res) => {
  const { groupName, categoryName } = req.body || {};
  if (!groupName || !categoryName) {
    return res.status(400).json({ message: "groupName, categoryName가 필요합니다." });
  }

  const sql = `
    DELETE c
    FROM pin_categories c
    JOIN pin_category_groups g ON g.group_no = c.group_no
    WHERE g.group_name = ? AND c.category_name = ?
  `;

  db.query(sql, [groupName, categoryName], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "카테고리 삭제 실패" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "대상 카테고리를 찾을 수 없습니다." });
    }
    res.json({ success: true });
  });
});

module.exports = router;
