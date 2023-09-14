import React, { createContext, useContext, useState, useEffect } from "react";

const DateContext = createContext(); // Crée un contexte React pour partager des données entre composants.

// Définit un composant "DateProvider" qui encapsule les enfants avec le contexte.
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(); // Crée un état local "selectedDate" pour stocker la date sélectionnée.

  // Utilise useEffect pour effectuer une action asynchrone lors de la création du composant.
  useEffect(() => {
    // Fonction asynchrone pour récupérer la dernière date depuis une API.
    const fetchDataFromApi = async () => {
      const urlDate = "lastdate";

      const apiUrl = process.env.REACT_APP_API_URL; // Récupère l'URL de l'API à partir des variables d'environnement.

      try {
        const url = `${apiUrl}/${urlDate}`;

        const response = await fetch(url); // Effectue une requête GET à l'URL de l'API.

        // Vérifie si la réponse de la requête est OK (code de statut 200).
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }

        // Analyse la réponse JSON de l'API pour obtenir la dernière date.
        const dateGeted = await response.json();
        const dateLast = dateGeted.lastDate;

        const dateString = dateLast.toString(); // Convertit la date obtenue en chaîne de caractères
        setSelectedDate(dateString); //met à jour l'état "selectedDate".
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromApi(); // Appelle la fonction pour récupérer la date lors de la création du composant (exécuté une seule fois).
  }, []);

  // Fonction pour mettre à jour la date sélectionnée.
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  // Rend le contexte "DateContext.Provider" en transmettant les données "selectedDate" et "updateSelectedDate" aux paramettre children.
  return (
    <DateContext.Provider value={{ selectedDate, updateSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Fonction pour utiliser le contexte dans d'autres composants.
export const useDateContext = () => {
  return useContext(DateContext);
};
