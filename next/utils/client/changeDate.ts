import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const changeDate = (propsDate: Date) => {
  return  format(new Date(propsDate), "yyyy년 M월 d일 EEEE aaaa h시 m분", { locale: ko }) ;
};
