export const DateFormater = (date) => {
 
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0"); // Attention : mois commence à 0
const year = date.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

return formattedDate;
}