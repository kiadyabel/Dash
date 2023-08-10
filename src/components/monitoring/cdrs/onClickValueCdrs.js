import { createContext, useContext, useState } from "react";

// Créez un context pour stocker l'état du type sélectionné et fournir des méthodes pour le mettre à jour.
const SelectedTypeContext = createContext();

// Créez un hook personnalisé pour utiliser le contexte.
export  function useSelectedType() {
  return useContext(SelectedTypeContext);
}

// Créez un fournisseur de contexte pour envelopper les composants.
export function SelectedTypeProvider({ children }) {
  const [selectedType, setSelectedType] = useState("OCC_DATA");

  const value = {
    selectedType,
    setSelectedType,
  };

  // Renvoyez les composants enfants enveloppés dans le contexte.
  return (
    <SelectedTypeContext.Provider value={value}>
      {children}
    </SelectedTypeContext.Provider>
  );
}
