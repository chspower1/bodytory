// 사용법
// Props
//  1. user : RegisterForm의 userState
//  2. checkList : 해당 페이지 Input 요소 이름 List
//  3. setError : 해당 페이지 form setError 함수
//  4. minLength : checkList 순서대로 배열
//  5. KoreanName : 이름 한글 매치
//  6. 인자 다 넣고 해당 페이지에 useEffect에 넣고 쓰기

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
    checkList.map((item, index) => {
      if (minLength) {
        if (String(user[item]).length < minLength[index]) {
          setError(item, {
            type: "minLength",
            message: `${
              item === "birth"
                ? `생년월일을 모두 입력해주세요!`
                : item === "gender"
                ? `성별을 체크해주세요!`
                : `${KoreanName[item]}을 ${minLength[index]}글자 이상 입력해 주세요!`
            }`,
          });
        }
      }
      if (!user[item]) {
        setError(item, { types: { required: ``, validate: "", minLength: "" } });
      }
    });
  }
};
