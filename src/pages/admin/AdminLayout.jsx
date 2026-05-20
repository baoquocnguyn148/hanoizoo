import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Zoo Admin
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
            <LayoutDashboard size={20} /> Tổng quan
          </Link>
          <Link to="/admin/tickets" className={location.pathname === '/admin/tickets' ? 'active' : ''}>
            <Ticket size={20} /> Đơn đặt vé
          </Link>
          <Link to="/admin/banners" className={location.pathname === '/admin/banners' ? 'active' : ''}>
            <ImageIcon size={20} /> Quản lý Banner
          </Link>
          <Link to="/admin/settings" className={location.pathname === '/admin/settings' ? 'active' : ''}>
            <Settings size={20} /> Cài đặt
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>Hệ thống quản trị</h2>
          <button onClick={handleLogout} className="btn btn-outline" style={{borderColor: '#ccc', color: '#333'}}>
            <LogOut size={18} style={{marginRight: '5px', verticalAlign: 'middle'}}/> Đăng xuất
          </button>
        </header>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
