// routes/feedback.js
const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:answer_no", (req, res) => {
  const { answer_no } = req.params;

  db.query(
    `
    SELECT
      a.answer_no,
      a.answer_content,
      a.create_datetime,

      q.question_content,
      q.pin_no,

      p.post_title,

      img.image_path
    FROM pin_answers a
    JOIN pin_questions q ON a.pin_no = q.pin_no
    JOIN pin_posts p ON q.post_no = p.post_no
    LEFT JOIN pin_post_images img ON q.image_no = img.image_no
    WHERE a.answer_no = ?
    `,
    [answer_no],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "피드백 조회 실패" });
      }
      res.json(rows[0]);
    }
  );
});

module.exports = router;
