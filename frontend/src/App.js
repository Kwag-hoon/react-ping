import { BrowserRouter, Routes, Route } from "react-router-dom";

// 스타일가이드
import './styles/base.css';  //초기화 및 기본 스타일 가이드

// 컴포넌트
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';

// 페이지
import Main from './pages/Main';
import Detail from './pages/design/Detail';

function App() {
  return (
    < >
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path={'/detail'} element={<Detail />}></Route>
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;
