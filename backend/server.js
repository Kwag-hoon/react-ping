const express = require('express');  //express 기본 라우팅
// http를 통해 get, post, put, delete 등의 메소드를 통해서 데이터를 주고받을 수 있음
const cors = require('cors');


const authRoutes = require('./routes/auth');

const app = express();
const PORT = 9070;  // 통신 포트 설정

app.use(cors());
app.use(express.json());

// 회원 관련
app.use('/users', authRoutes);

app.get('/', (req, res) => {
  res.send('Ping backend running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});