const sliceName = (name: string) => {
  const split = name.split(" ");

  if (split.length > 1) return split.filter(elem => elem.includes("병원"));

  const resplit = split.join("").split("재단");

  if (resplit.length === 1) return resplit;

  return resplit[1];
};

export default sliceName;
