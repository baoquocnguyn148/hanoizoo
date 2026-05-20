import { Link } from 'react-router-dom';
import './AnimalCard.css';

const AnimalCard = ({ id, name, scientificName, image, description }) => {
  return (
    <Link to={`/animals/${id}`} className="animal-card">
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" />
        <div className="card-overlay">
          <p className="card-desc">{description}</p>
        </div>
      </div>
      <div className="card-content">
        <h3 className="animal-name">{name}</h3>
        <p className="scientific-name">{scientificName}</p>
      </div>
    </Link>
  );
};

export default AnimalCard;
