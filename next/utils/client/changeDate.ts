export const changeDate = (propsDate: Date) => {
  const day_KR = ["일", "월", "화", "수", "목", "금", "토"];
  let ampm;
  let changeHours;
  let day;

  const createDate = new Date(propsDate);
  const year = createDate.getFullYear();
  const month = String(createDate.getMonth() + 1).padStart(2, "0");
  const date = String(createDate.getDate()).padStart(2, "0");
  const hours = createDate.getHours();
  const minutes = String(createDate.getMinutes()).padStart(2, "0");

  if (hours >= 12){
    ampm = "오후";
    changeHours = hours - 12;
  }else{
    ampm = "오전";
    changeHours = hours
  }

  day_KR.forEach((ele, idx) => {
    if (idx === createDate.getDay()) {
      day = ele;
    }
  });
  return `${year}년 ${month}월 ${date}일 ${day}요일 ${ampm} ${changeHours}시 ${minutes}분`;
};
