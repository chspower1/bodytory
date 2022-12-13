import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Gender, UserType } from "@prisma/client";
import FirstPage from "@components/register/FirstPage";
import ThirdPage from "@components/register/ThirdPage";
import SecondPage from "@components/register/SecondPage";
import Header from "@components/header/Header";
import ToryWhiteAnim from "@components/lotties/ToryWhiteAnim";
import { motion } from "framer-motion";
import styled from "styled-components";

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
export type RegisterFormList =
  | "agree"
  | "type"
  | "accountId"
  | "password"
  | "passwordConfirm"
  | "email"
  | "token"
  | "gender"
  | "name"
  | "birth"
  | "phone"
  | "isNotDuplicate"
  | "isCertified";

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
  useEffect(() => {
    if (router.query.isNew) {
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
      <ToryMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }}
      >
        <ToryWhiteAnim toryMotionIdx={0} width={480} />
      </ToryMotion>
    </>
  );
}

const ToryMotion = styled(motion.div)`
  position: fixed;
  left: 0px;
  bottom: 80px;
`;

export default RegisterPage;
