//archive.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/', (req, res) => {
  const { category_no } = req.body;

  const sql = `
    SELECT 
      p.post_no,
      p.post_title,
      p.create_datetime,
      i.image_path,
      p.category_no
    FROM pin_posts p
    JOIN pin_post_images i ON p.post_no = i.post_no
    ${category_no ? 'WHERE p.category_no = ?' : ''}
    ORDER BY p.create_datetime DESC
  `;
  db.query(
    sql,
    category_no ? [category_no] : [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }
      res.json(rows);
    }
  );
});

module.exports = router;