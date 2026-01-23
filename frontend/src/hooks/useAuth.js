import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 예시: 로컬 스토리지에 토큰이 있는지 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useAuth;
