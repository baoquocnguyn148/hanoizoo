import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const fallbackName = email ? email.split('@')[0] : 'TraMy';
    localStorage.setItem('zoo_user', fullName || fallbackName);
    navigate('/');
    window.location.reload(); // Simple way to update Navbar state
  };

  return (
    <div className="page-padding" style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)'}}>
      <div className="glass-panel" style={{padding: '3rem', width: '100%', maxWidth: '450px', background: 'white'}}>
        <h2 style={{color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center'}}>
          {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
        </h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          {!isLogin && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input name="fullName" type="text" placeholder="Ví dụ: Nguyễn Văn TraMy" required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="email@example.com" required />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        <div style={{textAlign: 'center', marginTop: '1.5rem', color: '#666'}}>
          {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <button onClick={() => setIsLogin(!isLogin)} style={{background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem'}}>
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
