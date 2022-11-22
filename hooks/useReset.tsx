import { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface UseResetProps<T extends FieldValues = any> {
  setValue: UseFormSetValue<T>;
}

const useReset = ({ setValue }: UseResetProps) => {
  const [isToken, setIsToken] = useState(false);
  const handleClickResetBtn = () => {
    setIsToken(false);
    setValue("token", "");
  };
  const ResetBtn = () => (
    <>
      {isToken && (
        <button type="button" onClick={handleClickResetBtn}>
          리셋
        </button>
      )}
    </>
  );
  return { isToken, setIsToken, ResetBtn };
};
export default useReset;
