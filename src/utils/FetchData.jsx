
export const FetchData = async (type, date, params) => {
 const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const url = `${apiUrl}/${type}/${date}/${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const dataGeted = await response.json();
    return dataGeted;
  } catch (error) {
    throw error;
  }
};
