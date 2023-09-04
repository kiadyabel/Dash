import React, { createContext, useContext, useState } from "react";

// Création d'un contexte pour gérer les couleurs
const ColorContext = createContext();

// Hook personnalisé pour accéder au contexte de couleurs
export const useColorContext = () => useContext(ColorContext);

// Fournisseur de contexte pour les couleurs
export const ColorProvider = ({ children }) => {
  // État local pour les différentes couleurs
  const [color1, setColor1] = useState("#eeeeee"); // pour max 5
  const [color2, setColor2] = useState("#ffa500"); // pour max 15
  const [color3, setColor3] = useState("#BF8013"); // pour max 25
  const [color4, setColor4] = useState("#f00020"); // pour max 100

  return (
    // Fournir les valeurs des couleurs via le contexte
    <ColorContext.Provider
      value={{
        color1,
        setColor1,
        color2,
        setColor2,
        color3,
        setColor3,
        color4,
        setColor4,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
