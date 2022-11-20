import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import { HelpForm } from ".";

const HelpFindId: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/auth/help/findId");
  const [email, setEmail] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [foundAccountId, setFoundAccountId] = useState("");
  const { mutateAsync } = useMutation(["findIdMutateKey"], postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess(data) {
      if (data?.ok) {
        if (isToken) {
          console.log("인증 완료");
          setFoundAccountId(`${data.data}`);
        }
        setIsToken(true);
      }
    },
  });
  const {
    register: helpRegister,
    handleSubmit: helpHandleSubmit,
    formState: { errors: helpErrors },
  } = useForm<HelpForm>();

  const onValidHelpForm = (helpForm: HelpForm) => {
    setEmail(helpForm?.email!);
    console.log(helpForm);
    mutateAsync(helpForm);
  };

  return (
    <div>
      <form onSubmit={helpHandleSubmit(onValidHelpForm)}>
        <Input
          name={"email"}
          label="이메일"
          register={helpRegister("email", {
            required: "이메일를 입력해주세요.",
            // pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: "올바른 이메일 형식이 아닙니다." },
          })}
          placeholder="이메일를 입력해주세요."
          errorMessage={helpErrors.email?.message}
        />
        {isToken && (
          <Input
            name="token"
            label="인증번호"
            register={helpRegister("token", {
              required: "인증번호를 입력해주세요.",
            })}
            placeholder="인증번호를 입력해주세요."
            errorMessage={helpErrors.token?.message}
          />
        )}

        <button>{isToken ? "인증번호 확인" : "이메일 인증"}</button>
        <div>
          {foundAccountId && (
            <>
              <p>사용자님의 아이디는 "{foundAccountId}"입니다.</p>
              <Link href="/auth/login">
                <button>로그인 하러가기</button>
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
export default HelpFindId;
