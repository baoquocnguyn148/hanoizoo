import { ShieldAlert, Leaf, Camera, Coffee, Clock, HelpCircle } from 'lucide-react';
import './Policies.css';

const Policies = () => {
  const policies = [
    {
      icon: <Leaf size={32} />,
      title: 'Tôn trọng động vật',
      desc: 'Tuyệt đối không chọc phá, ném đồ vật vào chuồng trại. Việc này gây hoảng sợ và nguy hiểm cho động vật.'
    },
    {
      icon: <Coffee size={32} />,
      title: 'Không tự ý cho ăn',
      desc: 'Động vật có khẩu phần dinh dưỡng riêng do chuyên gia thiết lập. Vui lòng không cho chúng ăn thức ăn bên ngoài.'
    },
    {
      icon: <Camera size={32} />,
      title: 'Chụp ảnh an toàn',
      desc: 'Được phép chụp ảnh nhưng không sử dụng đèn flash (flash) ở những khu vực có biển cấm. Không trèo qua lan can.'
    },
    {
      icon: <ShieldAlert size={32} />,
      title: 'Giữ gìn vệ sinh',
      desc: 'Bỏ rác đúng nơi quy định. Không hút thuốc lá trong khuôn viên sở thú để bảo vệ môi trường chung.'
    }
  ];

  const faqs = [
    {
      q: 'Tôi có thể đổi ngày tham quan sau khi đã mua vé không?',
      a: 'Vé đã mua không thể hoàn lại nhưng bạn có thể đổi ngày tham quan 1 lần, trước ít nhất 24 giờ so với giờ mở cửa của ngày đã đặt.'
    },
    {
      q: 'Có khu vực ăn uống bên trong không?',
      a: 'Sở thú có nhiều nhà hàng và quầy giải khát trải dọc theo các tuyến đường tham quan chính.'
    },
    {
      q: 'Trẻ em dưới bao nhiêu tuổi được miễn phí vé?',
      a: 'Trẻ em có chiều cao dưới 1 mét sẽ được miễn vé hoàn toàn khi đi cùng người lớn.'
    }
  ];

  return (
    <div className="policies-page page-padding">
      <div className="container">
        <div className="page-header text-center">
          <h1 className="section-title">Chính Sách & Nội Quy</h1>
          <p className="section-subtitle">Chung tay bảo vệ một môi trường an toàn cho cả động vật và du khách.</p>
        </div>

        {/* Nội quy tham quan */}
        <section className="policy-section">
          <div className="section-header">
            <h2>Quy Định Tham Quan</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="policy-grid">
            {policies.map((p, index) => (
              <div key={index} className="policy-card glass-panel">
                <div className="policy-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Thông tin bổ sung */}
        <div className="info-grid mt-5">
          {/* Giờ hoạt động */}
          <div className="info-card glass-panel dark">
            <Clock size={40} className="info-icon" />
            <h3>Giờ Hoạt Động</h3>
            <ul>
              <li><strong>Thứ 2 - Thứ 6:</strong> 08:00 - 17:00</li>
              <li><strong>Thứ 7, CN, Lễ:</strong> 07:30 - 18:00</li>
              <li>Mở cửa tất cả các ngày trong năm</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="faq-section glass-panel">
            <div className="faq-header">
              <HelpCircle size={28} className="faq-icon" />
              <h3>Câu Hỏi Thường Gặp</h3>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
