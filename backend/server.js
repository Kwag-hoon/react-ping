const express = require('express');  //express 기본 라우팅
// http를 통해 get, post, put, delete 등의 메소드를 통해서 데이터를 주고받을 수 있음
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload'); //게시물 + 이미지
const pinRoutes = require('./routes/pins'); // 핀 저장
const designRoutes = require('./routes/designs'); //detail 페이지
const categoryRoutes = require('./routes/category') //category 저장
const app = express();
const PORT = 9070;  // 통신 포트 설정

app.use(cors());
app.use(express.json());

//업로드 이미지 접근 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우터
app.use('/users', authRoutes); //회원관련
app.use('/api/posts', uploadRoutes); //업로드 관련
app.use('/api/pins', pinRoutes); //핀에디터 관련
app.use('/api/designs', designRoutes); //디테일 페이지 관련
app.use('/api' , categoryRoutes);

// 서버 상태 확인용
app.get('/', (req, res) => {
  res.send('Ping backend running');
});

// 서버 실행시 
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});