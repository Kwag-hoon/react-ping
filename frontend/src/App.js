import { BrowserRouter, Routes, Route } from "react-router-dom";

// 스타일가이드
import './styles/base.scss';  //초기화 및 기본 스타일 가이드

// 컴포넌트

import Footer from './components/layout/Footer';

// 페이지
import Main from './pages/Main';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Detail from './pages/design/Detail';
import Upload from "./pages/upload/Upload";
import Archive from './pages/design/Archive';
import PinEditor from "./pages/upload/PinEditor";

// import HeaderGuest from "./components/layout/header/HeaderGuest";
import HeaderUser from './components/layout/header/HeaderUser';  // 나중에 Header로 바꿀것
import TabBar from './components/layout/tabbar/TabBar';
// import TabBarUser from './components/layout/tabbar/TabBarUser';

function App() {
  return (
    < >
      <BrowserRouter>
        <HeaderUser />

        <Routes>
          
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/detail' element={<Detail />}></Route>
          <Route path='/archive' element={<Archive />}></Route>
          <Route path="/upload/pineditor" element={<PinEditor />} />
       </Routes>

        <Footer />
        {/* <TabBarUser /> */}
        <TabBar />


      </BrowserRouter>
    </>
  );
}

export default App;
