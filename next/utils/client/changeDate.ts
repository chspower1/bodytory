import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const changeDate = (propsDate: Date) => {
  return  format(new Date(propsDate), "yyyy년 MM월 dd일 EEEE aaaa h시 m분", { locale: ko }) ;
};
