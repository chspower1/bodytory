// 용도 :  errors 넣고 오류 있는지 없는지 확인
// 만든 이유 : errors가 없어도 {}이라 있는지 없는지 판단이 안됨

export const checkEmptyObj = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};
