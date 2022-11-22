import Input from "@components/Input";
import useApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import client from "utils/server/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Gender, UserType } from "@prisma/client";
import { REGISTER_SIGNUP } from "constant/queryKeys";
import useReset from "hooks/useReset";
import FirstPage from "@components/register/FirstPage";
import ThirdPage from "@components/register/ThirdPage";
import SecondPage from "@components/register/SecondPage";

export interface RegisterForm {
  agree: boolean;
  type: UserType;
  accountId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  token: string;
  gender: Gender;
  name: string;
  birth: string;
  phone?: string;
  isNotDuplicate: boolean;
  isCertified: boolean;
}
interface RegisterQueryProps {
  accountId: string;
  email: string;
  phone: string;
  name: string;
  birth: string;
  gender: Gender;
  type: UserType;
}
function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState<RegisterForm | undefined>();
  const [page, setPage] = useState(1);
  console.log(user);
  useEffect(() => {
    if (router.query.isNew) {
      console.log(router.query);
      const { accountId, email, phone, name, birth, gender, type } = router.query;
      const fakePassword = Math.floor(10000 + Math.random() * 1000000) + "";
      setUser(prev => ({
        ...prev!,
        accountId: accountId as string,
        password: fakePassword,
        passwordConfirm: fakePassword,
        email: email as string,
        phone: phone as string,
        name: name as string,
        birth: birth as string,
        gender: gender as Gender,
        type: type as UserType,
      }));
      setPage(1);
    } else {
      setUser(prev => ({ ...prev!, type: "origin" }));
    }
  }, []);

  return (
    <>
      {page === 1 && <FirstPage user={user} setUser={setUser} setPage={setPage} />}
      {page === 2 && <SecondPage user={user} setUser={setUser} setPage={setPage} />}
      {page === 3 && <ThirdPage user={user} setUser={setUser} setPage={setPage} />}
    </>
  );
}

export default RegisterPage;
