import styled from "styled-components";
import Link from "next/link";
import LogoutBtn from "@components/LogoutBtn";
import { loggedInUser } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { RegisterForm } from "./auth/register";


const Test = styled.div`
  color: red;
`;
export default function Home() {
  const[test, setTest] = useState<User | RegisterForm | null>(null);
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  useEffect(() => {
    setTest(currentUser);
  }, [])
  
  return (
    <Test>
      <div>{test?.name}</div>
      <Link href={"/users/profile/edit"}>
        <button>계정 관리</button>
      </Link>
      <Link href={"/users/records/write"}>
        <button>기록하기</button>
      </Link>
      <Link href={"/users/records/chart"}>
        <button>기록보기</button>
      </Link>
      <LogoutBtn/>
    </Test>
  );
}
