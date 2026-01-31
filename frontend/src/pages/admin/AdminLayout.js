import { Outlet, useNavigate } from 'react-router-dom';
import AdminTabs from './AdminTabs';
import AdminHeader from "./components/AdminHeader";

import '../styles/admin.scss';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: 로그아웃 처리 (토큰 삭제 등)
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin">
      <AdminHeader onLogout={handleLogout} />
      <AdminTabs />
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}