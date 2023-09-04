// SliderValuesContext.js

import React, { createContext, useContext, useState } from "react";

const SliderValuesContext = createContext();

export function SliderValuesProvider({ children }) {
  // Créez un état pour chaque valeur de slider
  const [sliderValue1, setSliderValue1] = useState(5);
  const [sliderValue2, setSliderValue2] = useState(15);
  const [sliderValue3, setSliderValue3] = useState(25);
  const [sliderValue4, setSliderValue4] = useState(100);

  return (
    <SliderValuesContext.Provider
      value={{
        sliderValue1,
        setSliderValue1,
        sliderValue2,
        setSliderValue2,
        sliderValue3,
        setSliderValue3,
        sliderValue4,
        setSliderValue4,
      }}
    >
      {children}
    </SliderValuesContext.Provider>
  );
}

export function useSliderValues() {
  return useContext(SliderValuesContext);
}
