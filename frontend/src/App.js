import { BrowserRouter, Routes, Route } from "react-router-dom";

// 스타일가이드
import './styles/base.scss';  //초기화 및 기본 스타일 가이드

// 컴포넌트
// import HeaderGuest from "./components/layout/header/HeaderGuest";
import HeaderUser from './components/layout/header/HeaderUser';  // 나중에 Header로 바꿀것
// import TabBar from './components/layout/tabbar/TabBar';
import TabBarUser from './components/layout/tabbar/TabBarUser';  
import Footer from './components/layout/Footer';

// 페이지
import Main from './pages/Main';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Detail from './pages/design/Detail';
import Upload from "./pages/upload/Upload";
import Archive from './pages/design/Archive';
import PinEditor from "./pages/upload/PinEditor";
// 마이페이지
import MyPageLayout from './pages/mypage/MyPageLayout';
import MyDesigns from './pages/mypage/MyDesigns';
import MyPins from './pages/mypage/MyPins';
import MyFeedback from './pages/mypage/MyFeedback';
import MyProfile from './pages/mypage/MyProfile';
import MyAlarm from './pages/mypage/MyAlarm';


function App() {
  return (
    < >
      <BrowserRouter>

        {/* 헤더 */}
        {/* <Header /> */}
        <HeaderUser />

        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/archive' element={<Archive />} />
          <Route path="/upload/pineditor" element={<PinEditor />} />
          {/* 마이페이지 레이아웃 */}
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<MyDesigns />} />
            <Route path="pins" element={<MyPins />} />
            <Route path="feedback" element={<MyFeedback />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="alarm" element={<MyAlarm />} />
          </Route>
        </Routes>

        {/* 모바일 탭바 */}
        <TabBarUser />
        {/* <TabBar /> */}

        {/* 푸터 */}
        <Footer />



      </BrowserRouter>
    </>
  );
}

export default App;
