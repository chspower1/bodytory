export const checkEmptyObj = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};
