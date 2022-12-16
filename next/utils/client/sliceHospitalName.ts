const EXCEOPTION_WORD = ["재단", "협회", "본부", "센타", "자치도지부"];
const sliceName = (name: string) => {
  let sliceResult = name.split(" ");

  if (sliceResult.length > 1) {
    sliceResult = sliceResult.filter(word => {
      if (word.includes("병원") || word.includes("의원") || word.includes("의료원")) return true;
    });
  }

  EXCEOPTION_WORD.forEach(word => {
    sliceResult.forEach(elem => {
      if (elem.includes(word)) {
        sliceResult = seperation(sliceResult, word);
      }
    });
  });

  if (sliceResult.length === 1) return sliceResult;

  return sliceResult[1];
};

function seperation(word: string[], splitword: string) {
  return word.join("").split(splitword);
}

export default sliceName;
