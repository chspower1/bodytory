import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "@components/Modal";
import useUser from "hooks/useUser";
// import LogoutBtn from "@components/LogoutBtn";
const Test = styled.div`
  color: red;
`;
export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const [showModal, setShowModal] = useState(false);
  const handleClickLogout = async () => {
    try {
      await LogoutApi({});
      router.push("/auth/login");
    } catch {
      console.log("logout Error");
    }
  };
  console.log(user);
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
      <button onClick={() => setShowModal(true)}>로그아웃</button>
      <Modal onClose={() => setShowModal(false)} activeFuction={handleClickLogout} show={showModal} title={"시스템"}>
        로그아웃 하시겠습니까?
      </Modal>
    </Test>
  );
}
