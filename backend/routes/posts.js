const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/posts', (req, res) => {
  const sql = `
    SELECT
  p.post_no AS id,
  p.post_title AS title,
  p.post_content AS description,
  g.group_name AS mainType,
  c.category_name AS subType,
  img.image_path AS imagePath,
  p.view_count AS viewCount,
  COUNT(DISTINCT pq.pin_no) AS pins,
  p.create_datetime AS createdAt
FROM pin_posts p

JOIN pin_post_images img
  ON img.post_no = p.post_no
  AND img.order_index = 1 

JOIN pin_questions pq
  ON pq.post_no = p.post_no /* 핀있는 게시물만 업로드가능하도록 */

JOIN pin_post_categories pc
  ON pc.post_no = p.post_no

JOIN pin_categories c
  ON c.category_no = pc.category_no

JOIN pin_category_groups g
  ON g.group_no = c.group_no

GROUP BY p.post_no, g.group_no, c.category_no
ORDER BY p.create_datetime DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('게시물 조회 오류:', err);
      return res.status(500).json({ message: '게시물 조회 실패' });
    }
    res.json(rows);
  });
});

// 조회수 증강 
router.post('/api/posts/:id/view',(req, res)=>{
  const{id} = req.params;

  const sql = `
  UPDATE pin_posts SET view_count = view_count + 1
  WHERE post_no = ? 
  `;

  db.query(sql, [id], (err)=>{
    if(err){
      console.error('조회수 증가 오류:', err);
      return res.status(500).json({message: '조회수 증가 실패'});
    }

    res.json({ success: true});
  });
});

module.exports = router;
