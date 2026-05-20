import { useState } from 'react';
import { Ticket, Calendar, Users, CreditCard } from 'lucide-react';
import { saveTicketOrder } from '../utils/storage';
import './Tickets.css';

const Tickets = () => {
  const [ticketType, setTicketType] = useState('adult');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [step, setStep] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);

  const prices = {
    adult: 300000,
    child: 150000,
    family: 750000
  };

  const calculateTotal = () => {
    return (prices[ticketType] * quantity).toLocaleString('vi-VN') + ' VNĐ';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const order = {
      id: `TCV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      visitDate: date,
      customerName: formData.get('customerName').toString().trim(),
      email: formData.get('email').toString().trim(),
      phone: formData.get('phone').toString().trim(),
      ticketType,
      ticketLabel: ticketType === 'adult' ? 'Người lớn' : ticketType === 'child' ? 'Trẻ em' : 'Gia đình',
      quantity,
      total: prices[ticketType] * quantity,
      status: 'Chờ xử lý'
    };
    saveTicketOrder(order);
    setCurrentOrder(order);
    setStep(2);
  };

  return (
    <div className="tickets-page page-padding">
      <div className="container">
        <div className="page-header text-center">
          <h1 className="section-title">Mua Vé Trực Tuyến</h1>
          <p className="section-subtitle">Đặt vé trước để trải nghiệm nhanh chóng, không cần xếp hàng.</p>
        </div>

        <div className="tickets-layout">
          {/* Thông tin giá vé */}
          <div className="tickets-info glass-panel">
            <h3>Bảng Giá Tham Quan</h3>
            <div className="price-list">
              <div className={`price-card ${ticketType === 'adult' ? 'selected' : ''}`} onClick={() => setTicketType('adult')}>
                <div className="price-header">
                  <h4>Vé Người Lớn</h4>
                  <span className="price">300.000đ</span>
                </div>
                <p>Khách trên 1m3</p>
              </div>
              <div className={`price-card ${ticketType === 'child' ? 'selected' : ''}`} onClick={() => setTicketType('child')}>
                <div className="price-header">
                  <h4>Vé Trẻ Em</h4>
                  <span className="price">150.000đ</span>
                </div>
                <p>Khách từ 1m - 1m3 (Miễn phí dưới 1m)</p>
              </div>
              <div className={`price-card ${ticketType === 'family' ? 'selected' : ''}`} onClick={() => setTicketType('family')}>
                <div className="price-header">
                  <h4>Vé Gia Đình</h4>
                  <span className="price">750.000đ</span>
                </div>
                <p>Gồm 2 Người lớn & 2 Trẻ em</p>
              </div>
            </div>
          </div>

          {/* Form đặt vé */}
          <div className="ticket-form-wrapper glass-panel">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="ticket-form animate-fade-in">
                <h3>Chi Tiết Đặt Vé</h3>
                
                <div className="form-group">
                  <label><Calendar size={18} /> Ngày tham quan</label>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>

                <div className="form-group">
                  <label><Users size={18} /> Số lượng</label>
                  <div className="quantity-controls">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Thông tin liên hệ</label>
                  <input name="customerName" type="text" placeholder="Họ và tên" required className="mb-2" />
                  <input name="email" type="email" placeholder="Email nhận vé" required className="mb-2" />
                  <input name="phone" type="tel" placeholder="Số điện thoại" required />
                </div>

                <div className="total-section">
                  <span>Tổng thanh toán:</span>
                  <span className="total-price">{calculateTotal()}</span>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-4">
                  <CreditCard size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Tiến hành thanh toán
                </button>
              </form>
            ) : (
              <div className="success-state animate-fade-in text-center">
                <div className="success-icon">
                  <Ticket size={48} />
                </div>
                <h3>Đặt Vé Thành Công!</h3>
                <p>Cảm ơn bạn đã đặt vé. Đơn của bạn đã được ghi nhận và đang chờ xử lý.</p>
                <div className="ticket-summary">
                  <p><strong>Mã đơn:</strong> #{currentOrder?.id}</p>
                  <p><strong>Ngày đi:</strong> {currentOrder?.visitDate}</p>
                  <p><strong>Loại vé:</strong> {currentOrder?.ticketLabel}</p>
                  <p><strong>Số lượng:</strong> {currentOrder?.quantity}</p>
                  <p><strong>Tổng tiền:</strong> {currentOrder?.total.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <button onClick={() => setStep(1)} className="btn btn-outline w-100 mt-4" style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}>Đặt thêm vé</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
