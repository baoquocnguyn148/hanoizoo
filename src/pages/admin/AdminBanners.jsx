import { ArrowDown, ArrowUp, Edit2, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { getBanners, saveBanners } from '../../utils/storage';

const emptyForm = {
  id: null,
  title: '',
  subtitle: '',
  description: '',
  buttonText: 'Mua Vé Ngay',
  link: '/tickets',
  image: ''
};

const AdminBanners = () => {
  const [banners, setBanners] = useState(() => getBanners());
  const [form, setForm] = useState(emptyForm);

  const updateBanners = (nextBanners) => {
    setBanners(nextBanners);
    saveBanners(nextBanners);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) return;

    const banner = {
      ...form,
      id: form.id || Date.now(),
      status: 'Đang hiển thị',
      showDesc: true
    };
    const nextBanners = form.id
      ? banners.map((item) => item.id === form.id ? banner : item)
      : [...banners, banner];

    updateBanners(nextBanners);
    setForm(emptyForm);
    e.currentTarget.reset();
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const nextBanners = [...banners];
    [nextBanners[index - 1], nextBanners[index]] = [nextBanners[index], nextBanners[index - 1]];
    updateBanners(nextBanners);
  };

  const moveDown = (index) => {
    if (index === banners.length - 1) return;
    const nextBanners = [...banners];
    [nextBanners[index], nextBanners[index + 1]] = [nextBanners[index + 1], nextBanners[index]];
    updateBanners(nextBanners);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      updateBanners(banners.filter((banner) => banner.id !== id));
    }
  };

  const handleEdit = (banner) => {
    setForm({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      buttonText: banner.buttonText || 'Mua Vé Ngay',
      link: banner.link || '/tickets',
      image: banner.image
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Quản lý Banner Chiến dịch</h3>
        <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Upload ảnh từ máy và lưu vào slider trang chủ.</p>
      </div>

      <form className="banner-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Tiêu đề banner</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Ví dụ: Hành trình khám phá" required />
          </div>
          <div className="form-group">
            <label>Tiêu đề phụ</label>
            <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Ví dụ: Khám phá thiên nhiên" />
          </div>
          <div className="form-group">
            <label>Nút hành động</label>
            <input name="buttonText" value={form.buttonText} onChange={handleChange} placeholder="Mua Vé Ngay" required />
          </div>
          <div className="form-group">
            <label>Link đích</label>
            <input name="link" value={form.link} onChange={handleChange} placeholder="/tickets" required />
          </div>
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Nội dung hiển thị trên banner" rows="3" />
        </div>

        <div className="banner-upload-row">
          <label className="upload-box">
            <Upload size={20} />
            <span>{form.image ? 'Đổi ảnh từ máy' : 'Chọn ảnh từ máy'}</span>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {form.image && <img src={form.image} alt="Xem trước banner" className="banner-preview" />}
        </div>

        <button className="btn btn-primary" type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={18} /> {form.id ? 'Lưu banner' : 'Thêm banner'}
        </button>
      </form>

      <div className="banner-grid">
        {banners.length > 0 ? banners.map((banner, index) => (
          <div key={banner.id} className="banner-card">
            <div style={{ position: 'relative' }}>
              <img src={banner.image} alt={banner.title} className="banner-img" />
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => moveUp(index)} disabled={index === 0} className="icon-action">
                  <ArrowUp size={16} />
                </button>
                <button onClick={() => moveDown(index)} disabled={index === banners.length - 1} className="icon-action">
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
            <div className="banner-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <h4 style={{ margin: '0 0 0.5rem' }}>{banner.title}</h4>
                <span style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px', color: '#666' }}>Thứ tự: {index + 1}</span>
              </div>
              <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>Link đích: {banner.link}</p>
              <span className="status-badge success">{banner.status}</span>
            </div>
            <div className="banner-actions">
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', borderColor: '#ccc', color: '#333' }} onClick={() => handleEdit(banner)}>
                <Edit2 size={16} /> Sửa
              </button>
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', borderColor: '#ffcdd2', color: '#d32f2f' }} onClick={() => handleDelete(banner.id)}>
                <Trash2 size={16} /> Xóa
              </button>
            </div>
          </div>
        )) : (
          <div className="empty-state full-span">Chưa có banner thật. Hãy chọn ảnh từ máy và thêm banner đầu tiên.</div>
        )}
      </div>
    </div>
  );
};

export default AdminBanners;
