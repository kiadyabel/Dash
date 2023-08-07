export const FetchData = async (type, date) => {

  try {
    const url = `http://test.krillsolutions.com/${type}/${date}`;
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
