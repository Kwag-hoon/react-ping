import { BrowserRouter, Routes, Route } from "react-router-dom";

// 스타일가이드
import './styles/base.css';  //초기화 및 기본 스타일 가이드

// 페이지
import Main from './pages/Main';
// 컴포넌트
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';




function App() {
  return (
    < >
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;
