//format date and time
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ro-RO").format(date);
};

//generate a unique id for cards

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return Math.abs((firstDate - secondDate) / oneDay);
};

export const getIdCardStatus = (expiryDate) => {
  if (!expiryDate) return "valid";

  const today = new Date();
  const expiredDate = new Date(expiryDate);
  if (expiredDate < today) return "expired";

  const daysToExpiry = daysBetween(today, expiredDate);
  if (daysToExpiry < 90) {
    return "expiring";
  }

  return "valid";
};

export const filterIdCardsByStatus = (idCards, status) => {
  if (!idCards) return [];
  if (status === "all") return idCards;

  return idCards.filter((card) => getIdCardStatus(card.expiryDate) === status);
};

export const searchIdCards = (idCards, term) => {
  if (!idCards) return [];
  if (!term) return idCards;

  const searchTerm = term.toLowerCase();
  //console.log("searchIdCards function", idCards);
  return idCards.filter(
    (card) =>
      card.firstName.toLowerCase().includes(searchTerm) ||
      card.lastName.toLowerCase().includes(searchTerm) ||
      card.idNumber.toLowerCase().includes(searchTerm)
  );
};
