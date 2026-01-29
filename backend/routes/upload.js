const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/designs');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  const { title, desc } = req.body;
  const imagePath = `/uploads/designs/${req.file.filename}`;

  const postSql = `
    INSERT INTO pin_posts (user_no, post_title, post_content)
    VALUES (?, ?, ?)
  `;

  db.query(postSql, [1, title, desc], (err, postResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    const postNo = postResult.insertId;

    const imgSql = `
      INSERT INTO pin_post_images (post_no, image_path)
      VALUES (?, ?)
    `;

    db.query(imgSql, [postNo, imagePath], (err, imgResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({
        postNo,
        imageNo: imgResult.insertId,
        imagePath,
      });
    });
  });
});

module.exports = router;
