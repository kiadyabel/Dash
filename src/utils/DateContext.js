import dayjs from "dayjs";
import React, { createContext, useContext, useState ,useEffect} from "react";
import moment from "moment";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
 

 const [selectedDate, setSelectedDate] = useState(dayjs());

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
       const date = dayjs(dateLast, "DD-MM-YYYY").toDate();
       console.log(date)
     } catch (error) {
       console.error("Erreur le daty :", error);
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
