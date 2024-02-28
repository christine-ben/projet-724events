import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";


const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  
  
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements en fonction du type sélectionné et de la page actuelle.
  const filteredEvents = (
    // Si aucun type n'est sélectionné, affiche tous les événements.
    (!type
      // Affiche tous les événements
      ? data?.events
      // ****** (correction).************************************************
      // cette ligne de code filtre les événements pour ne conserver que 
      // ceux dont le type correspond à la valeur de la variable "type".
      : data?.events.filter((event) => event.type === type)) || []
  ).filter((event, index) => {
    // Condition pour inclure les événements dans la plage de pagination.
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;// Inclure l'événement.
    }
    return false;// Exclure l'événement.
  });
  

  // Fonction pour changer le type d'événement filtré.
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* Utilisation du composant Select pour filtrer les événements par type. */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
           {/* Affichage de la liste des événements filtrés. */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
