// 사용법
// Props
//  1. user : RegisterForm의 userState
//  2. checkList : 해당 페이지 Input 요소 이름 List
//  3. setError : 해당 페이지 form setError 함수

import { FieldValues, Path, UseFormSetError } from "react-hook-form";

interface CreateErrorsProps<T extends FieldValues = any> {
  user: T;
  checkList: Path<T>[];
  setError: UseFormSetError<T>;
  minLength?: number[];
  KoreanName: { [key: string]: string };
}
export const createErrors = <T extends FieldValues = any>({
  user,
  checkList,
  setError,
  minLength,
  KoreanName,
}: CreateErrorsProps<T>) => {
  if (user) {
    console.log("error발생 시작");
    checkList.map((item, index) => {
      if (minLength) {
        if (String(user[item]).length < minLength[index]) {
          console.log(item, "error발생");
          setError(item, {
            type: "minLength",
            message: `${KoreanName[item]}을 ${minLength[index]}글자 이상 입력해 주세요!`,
          });
        }
      }
      if (!user[item]) {
        console.log(item, "error발생");
        setError(item, { types: { required: ``, validate: "", minLength: "" } });
      }
    });
  }
};
