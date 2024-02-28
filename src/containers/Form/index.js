import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";


const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })


const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // Fonction de rappel pour gérer la soumission du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      //  à true pour indiquer que le formulaire est en cours de soumission
      setSending(true);
       // Ajout de console.log pour le débogage
       // console.log("Envoi du formulaire de contact......");
      
       // We try to call mockContactApi
      try {
        await mockContactApi();// Simuler un appel API asynchrone
        // Ajout de console.log pour le débogage
         // console.log("Formulaire de contact soumis avec succès !");
      
        setSending(false);// Réinitialiser l'état d'envoi après un appel réussi
        
        // *******/ correction (onSuccess manquant pour l'affichage de la modale 'message envoyé'**********
        onSuccess(); // Appeler la fonction de succès lorsque l'appel est réussi
      
      } catch (err) {
        // Ajout de console.log pour le débogage
        // console.error("Erreur lors de l'envoi du formulaire de contact:", err);
        setSending(false);// Réinitialiser l'état d'envoi s'il y a une erreur
        onError(err);// Appeler la fonction de rappel onError avec l'erreur 
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;

