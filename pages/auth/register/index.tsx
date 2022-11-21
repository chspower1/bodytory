import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Gender, UserType } from "@prisma/client";
import { REGISTER_SIGNUP } from "constant/queryKeys";
import useReset from "@libs/client/useReset";
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
  const [type, setType] = useState("origin");
  const [page, setPage] = useState(1);

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
    }
  }, [router]);

  return (
    <>
      {page === 1 && <FirstPage user={user} setUser={setUser} setPage={setPage} />}
      {page === 2 && <SecondPage user={user} setUser={setUser} setPage={setPage} />}
      {page === 3 && <ThirdPage user={user} setUser={setUser} setPage={setPage} />}
    </>
  );
}

export default RegisterPage;
const GenderBox = styled.div`
  .innerBox {
    display: inline-flex;
  }

  .inputBox {
    width: 80px;
    height: 50px;
    border: 1px solid #000;
  }

  input {
    position: absolute;
    left: -999999%;
  }
  input:checked + label {
    background: #000;
    color: #fff;
  }
`;
const GenderLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
