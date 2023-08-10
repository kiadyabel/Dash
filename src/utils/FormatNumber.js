
import numeral from "numeral";

export const NumberAbbreviation = ({ value }) => {
  const formattedValue = numeral(value).format("0.0a");
  
  return formattedValue
};

