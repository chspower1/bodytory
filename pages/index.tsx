import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import useApi from "@libs/client/useApi";
import { useRouter } from "next/router";
import LogoutBtn from "@components/LogoutBtn";
const Test = styled.div`
  color: red;
`;
export default function Home() {
  const router = useRouter();
  const { deleteApi: LogoutApi } = useApi("/api/users/logout");
  const handleClickLogout = () => {
    router.replace("/auth/login");
    LogoutApi({});
  };
  return (
    <Test>
      홈
      <Link href={"/profile/edit"}>
        <button>계정 관리</button>
      </Link>
      <LogoutBtn />
    </Test>
  );
}
