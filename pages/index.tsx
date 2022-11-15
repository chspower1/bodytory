import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
const Test = styled.div`
  color: red;
`;
export default function Home() {
  // const test = await (await fetch("/api/hello")).json();
  // console.log(test);
  return <Test>홈</Test>;
}
