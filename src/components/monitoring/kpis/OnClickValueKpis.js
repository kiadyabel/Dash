import { createContext, useContext, useState } from "react";

// Créez un context pour stocker l'état du Name sélectionné et fournir des méthodes pour le mettre à jour.
const SelectedNameContext = createContext();

// Créez un hook personnalisé pour utiliser le contexte.
export function useSelectedName() {
  return useContext(SelectedNameContext);
}

// Créez un fournisseur de contexte pour envelopper les composants.
export function SelectedNameProvider({ children }) {
  const [selectedName, setSelectedName] = useState("RECHARGE FEES");

  const value = {
    selectedName,
    setSelectedName,
  };

  // Renvoyez les composants enfants enveloppés dans le contexte.
  return (
    <SelectedNameContext.Provider value={value}>
      {children}
    </SelectedNameContext.Provider>
  );
}
