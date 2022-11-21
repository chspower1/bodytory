// @ts-nocheck
import { HelpForm } from "pages/auth/help/findpw";
import { RegisterForm } from "pages/auth/register";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface UseResetProps {
  setValue: UseFormSetValue<RegisterForm> | UseFormSetValue<HelpForm>;
}

export default function useReset({ setValue }: UseResetProps) {
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
}
