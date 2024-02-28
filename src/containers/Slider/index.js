import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // Tri des événements par date de manière décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
   
  /*  Changement de l'opérateur logique pour trier dans le bon sens les images
      De la plus récente à la plus ancienne (ordre décroissant) */
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  // Fonction pour afficher la prochaine carte après un délai de 5000 millisecondes
  const nextCard = () => {
    setTimeout(
      /*
        Suppression de l'élément "undefined" en ajoutant +1 à index
        Ajout de "?" pour vérifier que byDateDesc existe
      */
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  
  // déclencher la fonction nextCard après chaque rendu
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        /*  Suppresion des <></> qui encapsulait 2 éléments différents  
        cela pourrait causer des problèmes en raison de la logique de rendu 
        conditionnel à l'intérieur de la boucle map. */
        <div
        /* j'ai choisi date comme clé principalement parce que les événements ont des dates différentes,
         et utiliser ces dates comme clés garantit l'unicité des clés dans la liste. */
          key={event.date}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          *
          {/* **correctif*************
          Attribut alt modifié pour avoir les renseignements correspondants à l'image */}
          <img src={event.cover} alt={event.title}/>
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
             // Changement de la key pour qu'elle corresponde à la slide en cours
              key={_.date}
              type="radio"
              name="radio-button"
              /*
                    Remplacement de idx par index pour indiquer sur quelle image on se trouve 
                */
              checked={index === radioIdx}
              /* J'ai ajouté readOnly aux boutons radio dans la section de pagination pour 
              éviter les avertissements liés à l'absence de gestionnaire onChange. Cela indique 
              simplement que ces boutons radio sont en lecture seule et ne nécessitent pas
               de gestionnaire d'événements onChange. */
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;