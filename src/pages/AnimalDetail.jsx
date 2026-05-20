import { ArrowLeft, Leaf, MapPin, ShieldCheck, Utensils } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { animals } from '../data/animals';
import './AnimalDetail.css';

const AnimalDetail = () => {
  const { id } = useParams();
  const animal = animals.find((item) => item.id === id);

  if (!animal) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="animal-detail page-padding">
      <section className="animal-detail-hero">
        <img src={animal.image} alt={animal.name} />
        <div className="animal-detail-overlay"></div>
        
        <div className="back-link-wrapper">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} /> Quay lại trang chủ
            </Link>
          </div>
        </div>

        <div className="container animal-detail-heading">
          <p className="animal-kicker">Hồ sơ động vật</p>
          <h1>{animal.name}</h1>
          <p className="animal-science">{animal.scientificName}</p>
        </div>
      </section>

      <section className="animal-detail-body">
        <div className="container animal-detail-grid">
          <article className="animal-story">
            <h2>Giới thiệu</h2>
            <p className="lead">{animal.description}</p>
            <p>{animal.details}</p>
          </article>

          <aside className="animal-facts">
            <div className="fact-row">
              <MapPin size={22} />
              <div>
                <span>Môi trường sống</span>
                <strong>{animal.habitat}</strong>
              </div>
            </div>
            <div className="fact-row">
              <Utensils size={22} />
              <div>
                <span>Thức ăn</span>
                <strong>{animal.diet}</strong>
              </div>
            </div>
            <div className="fact-row">
              <ShieldCheck size={22} />
              <div>
                <span>Tình trạng bảo tồn</span>
                <strong>{animal.conservation}</strong>
              </div>
            </div>
            <div className="fact-note">
              <Leaf size={20} />
              <p>Mỗi lượt tham quan góp phần lan tỏa nhận thức bảo tồn và tình yêu thiên nhiên.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default AnimalDetail;
