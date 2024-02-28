export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// Ajout +1 pour avoir le bon mois affiché car Cela compense le fait que 
// la méthode getMonth renvoie des valeurs de 0 à 11, tandis objet MONTHS commence à l'index 1.
export const getMonth = (date) => MONTHS[date.getMonth() + 1];

