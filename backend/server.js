const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");     // 로그인/회원가입 같은 auth
const usersRoutes = require("./routes/users");   // ✅ 프로필/아바타 업로드 포함 (네가 수정한 파일)
const mypageRoutes = require("./routes/mypage"); // ✅ 마이디자인 목록 등
const uploadRoutes = require("./routes/upload"); // 게시물 + 이미지 업로드
const pinRoutes = require("./routes/pins");      // 핀 저장
const designRoutes = require("./routes/designs");// 공용 detail (imageUrl, pins)
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/posts");
const answerRoutes = require('./routes/answer'); //핀 답변 

const app = express();
const PORT = 9070;

// ✅ 미들웨어(가장 위)
app.use(cors());
app.use(express.json());

//업로드 이미지 접근 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우터
app.use('/users', authRoutes); //회원관련
app.use('/api/posts', uploadRoutes); //업로드 관련
app.use('/api/pins', pinRoutes); //핀에디터 관련
app.use('/api/designs', designRoutes); //디테일 페이지 관련
app.use('/api', categoryRoutes);
app.use("/users", mypageRouter);
app.use(postRoutes); 
app.use(answerRoutes);


// 서버 상태 확인용
app.get('/', (req, res) => {
  res.send('Ping backend running');
});

// 서버 실행시 
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

// 마이프로필 유저 라우터 연결
app.use(express.urlencoded({ extended: true }));

// ✅ 업로드 이미지 정적 제공
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ 라우터 연결 (중복 없이!)
app.use("/auth", authRoutes);         // 예: /auth/login, /auth/signup (너 authRoutes 실제 경로에 맞춰)
app.use("/users", usersRoutes);       // 예: /users/me, /users/profile, /users/profile/avatar
app.use("/mypage", mypageRoutes);     // 예: /mypage/designs
app.use("/api/posts", uploadRoutes);
app.use("/api/pins", pinRoutes);

// ✅ 공용 디자인 상세 라우트는 하나로 통일 추천
app.use("/designs", designRoutes);    // 예: /designs/:postNo

app.use("/api", categoryRoutes);
app.use(postRoutes);

// 서버 상태 확인
app.get("/", (req, res) => {
  res.send("Ping backend running");
});

// ✅ listen은 맨 마지막
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
