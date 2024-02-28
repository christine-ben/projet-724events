import PropTypes from "prop-types";

import "./style.scss";

const ModalEvent = ({ event }) => (
    <div className="ModalEvent">
      {/* Section pour afficher l'image de l'événement */}
      <div className="ModalEvent__imageContainer">
        <img
          data-testid="card-image-testid"
          src={event.cover}
          alt={event.title}
        />
      </div>
      {/* Section pour afficher le titre et la période de l'événement */}
      <div className="ModalEvent__title">
        <div className="ModalEvent__titleLabel">{event.title}</div>
        <div className="ModalEvent__titlePeriode">{event.periode}</div>
      </div>
       {/* Section pour afficher la description de l'événement */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Description</h3>
        <div>{event.description}</div>
      </div>
      {/* Section pour afficher le nombre de participants à l'événement */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Participants</h3>
        <div>{event.nb_guesses} participants</div>
      </div>
      {/* Section pour afficher les prestations de l'événement */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Prestations</h3>
        {event.prestations.map((presta) => (
          <div key={presta}>{presta}</div>
        ))}
      </div>
    </div>
  );

ModalEvent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.any.isRequired,
}

export default ModalEvent;

