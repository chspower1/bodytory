/**
 * 생년월일 입력시 만나이 계산하여 리턴
 * @param birthDate - 생년월일 8자리 string타입
 * @returns 만 나이 string타입 리턴
 */

const getAmericanAge = (birthDate: string) => {
  const today = new Date();
  const birthYear = Number(birthDate.substring(0, 4));
  const birthMonth = Number(birthDate.substring(4, 6));
  const birthDay = Number(birthDate.substring(6, 8));
  const birth = new Date(birthYear, birthMonth, birthDay);

  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};
export default getAmericanAge;
