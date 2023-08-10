import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { FetchData } from "./FetchData";

// Créez le contexte
const DateContext = createContext();

// Fournisseur du contexte
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(1, "day")); // État pour stocker la date
  let [lastDateValue, setLastDateValue] = useState([]); ///dernier date obtenue dans a base de donnée

    useEffect(() => { // recuperation de la dernier date
      const fetchDataFromApi = async () => {
         const urlDate = "lastDate";
        try {
        const fetchedDate = await FetchData(urlDate);
        setLastDateValue(fetchedDate.lastDate);
        console.log(fetchedDate);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }

        /*try {
          const url = "http://test.krillsolutions.com/lastdate";
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Erreur lors de la requête");
          }

          const dataGeted = await response.json();
          console.log(dataGeted);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }*/
      }

      fetchDataFromApi();
    }, [lastDateValue]);

  // Mettez à jour la date dans le contexte lorsque le bouton "Filtrer" est cliqué
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider value={{ selectedDate, updateSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Utilitaire pour utiliser le contexte
export const useDateContext = () => {
  return useContext(DateContext);
};
