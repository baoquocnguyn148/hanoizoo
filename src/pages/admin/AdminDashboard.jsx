import { Image, Ticket, DollarSign, Users } from 'lucide-react';
import { getBanners, getTicketOrders } from '../../utils/storage';

const formatCurrency = (value) => `${value.toLocaleString('vi-VN')}đ`;

const AdminDashboard = () => {
  const orders = getTicketOrders();
  const banners = getBanners();
  const totalTickets = orders.reduce((sum, order) => sum + order.quantity, 0);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const latestOrders = orders.slice(0, 5);

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Tổng quan dữ liệu</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h4>Khách đã đặt</h4>
            <div className="value">{totalTickets}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
            <Ticket size={24} />
          </div>
          <div className="stat-info">
            <h4>Đơn đặt vé</h4>
            <div className="value">{orders.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h4>Doanh thu ghi nhận</h4>
            <div className="value">{formatCurrency(totalRevenue)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
            <Image size={24} />
          </div>
          <div className="stat-info">
            <h4>Banner đang lưu</h4>
            <div className="value">{banners.length}</div>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <h3 style={{ padding: '1.5rem', borderBottom: '1px solid #eee', margin: 0 }}>Đơn vé mới nhất</h3>
        {latestOrders.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Loại vé</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.ticketLabel}</td>
                  <td>{order.quantity}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td><span className="status-badge warning">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">Chưa có đơn đặt vé nào. Khi khách đặt vé, dữ liệu sẽ xuất hiện tại đây.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
