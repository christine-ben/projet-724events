import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";



const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  // console.log pour voir les valeurs passées
  // console.log("imageSrc:", imageSrc)
   console.log("title:", title);
  
  return (
    <div
      data-testid="card-testid"
      className={`EventCard ${small ? "EventCard--small" : ""}`}
      {...props}
      //  Un conteneur pour l'image et le label est rendu.
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      {/* Un conteneur pour la description (titre et mois) est rendu. */}
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
  };

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
