import { BrowserRouter, Routes, Route } from "react-router-dom";

// 스타일가이드
import './styles/base.scss';  //초기화 및 기본 스타일 가이드

// 컴포넌트
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';

// 페이지
import Main from './pages/Main';
import Detail from './pages/design/Detail';
import Upload from "./pages/upload/Upload";
import Archive from './pages/design/Archive';
import PinEditor from "./pages/upload/PinEditor";

function App() {
  return (
    < >
      <BrowserRouter>
        <Header />

        <Routes>
          
          <Route path="/" element={<Main />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/detail' element={<Detail />}></Route>
          <Route path='/archive' element={<Archive />}></Route>
          <Route path="/upload/pineditor" element={<PinEditor />} />
c        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;
