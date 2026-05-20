import { Download } from 'lucide-react';
import { getTicketOrders } from '../../utils/storage';

const formatCurrency = (value) => `${value.toLocaleString('vi-VN')}đ`;
const formatDate = (value) => value ? new Date(value).toLocaleDateString('vi-VN') : '';

const AdminTickets = () => {
  const orders = getTicketOrders();

  const exportReport = () => {
    if (orders.length === 0) return;
    const headers = ['Mã đơn', 'Ngày đặt', 'Ngày tham quan', 'Khách hàng', 'Email', 'Số điện thoại', 'Loại vé', 'Số lượng', 'Tổng tiền', 'Trạng thái'];
    const rows = orders.map((order) => [
      order.id,
      formatDate(order.createdAt),
      formatDate(order.visitDate),
      order.customerName,
      order.email,
      order.phone,
      order.ticketLabel,
      order.quantity,
      order.total,
      order.status
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `don-ve-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Quản lý Đơn vé</h3>
        <button className="btn btn-primary" onClick={exportReport} disabled={orders.length === 0}>
          <Download size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Xuất báo cáo
        </button>
      </div>

      <div className="admin-table-container">
        {orders.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày tham quan</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Loại vé</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{formatDate(order.visitDate)}</td>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>{order.ticketLabel}</td>
                  <td>{order.quantity}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td><span className="status-badge warning">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">Chưa có dữ liệu đặt vé thật. Hãy đặt vé từ trang Mua vé để kiểm tra luồng dữ liệu.</div>
        )}
      </div>
    </div>
  );
};

export default AdminTickets;
