
export const checkBirth = (date : string)=>{
  const year = Number(date.slice(0,4)); 
  const month = Number(date.slice(5,7));
  const day = Number(date.slice(8));
  console.log("hihiin", year)
  console.log("hihiin", month)
  console.log("hihiin", day)
  if(month === 2){
    if((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)){
      if(day > 29){
        console.log("hihiin")
        return false
      }
    }else{
      if(day > 28){
        return false
      }
    }
  }
  return true
}