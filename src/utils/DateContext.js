import React, { createContext, useContext, useState ,useEffect} from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
 

 const [selectedDate, setSelectedDate] = useState();

 useEffect(() => {
   const fetchDataFromApi = async () => {
     const urlDate = "lastdate";
     const apiUrl = process.env.REACT_APP_API_URL;
     try {
       const url = `${apiUrl}/${urlDate}`;
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error("Erreur lors de la requête");
       }
       const dateGeted = await response.json();
       const dateLast = dateGeted.lastDate;
       const dateString = dateLast.toString()
       setSelectedDate(dateString) // valeur par defaut de l'etat , date last
     } catch (error) {
       console.error(error);
     }
   };

   fetchDataFromApi();
 }, []);

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider value={{ selectedDate, updateSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  return useContext(DateContext);
};
