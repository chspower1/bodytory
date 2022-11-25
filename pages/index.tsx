import styled from "styled-components";
import Link from "next/link";
import LogoutBtn from "@components/LogoutBtn";


const Test = styled.div`
  color: red;
`;
export default function Home() {
  
  return (
    <Test>
      홈
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
