import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả lập login thành công
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>Zoo Admin Portal</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tài khoản</label>
            <input type="text" placeholder="admin" required defaultValue="admin" />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" required defaultValue="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
