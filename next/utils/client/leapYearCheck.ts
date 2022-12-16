export const checkBirth = (date: string) => {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8));
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (day > 29) {
        return false;
      }
    } else {
      if (day > 28) {
        return false;
      }
    }
  }
  return true;
};
