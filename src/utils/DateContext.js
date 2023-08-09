import React, { createContext, useContext, useState } from "react";

// Créez le contexte
const DateContext = createContext();

// Fournisseur du contexte
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(""); // État pour stocker la date

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Utilitaire pour utiliser le contexte
export const useDateContext = () => {
  return useContext(DateContext);
};
