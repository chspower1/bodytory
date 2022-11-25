import { RoundButton } from "@components/button/Button";
import Human from "@components/human";
import Confirm from "@components/records/write/Confirm";
import Select from "@components/records/write/Select";
import { Box, Col, Row } from "@styles/Common";
import { theme } from "@styles/theme";
import React, { useState } from "react";
import styled from "styled-components";

export default function RecordPage() {
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("증상을 기록할 부위를 선택해주세요");
  const [position, setPosition] = useState("");
  return (
    <Container>
      {page === 1 && <Select />}
      {page === 2 && <Confirm />}
      <Human></Human>
    </Container>
  );
}
const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightBg};
`;
const BlackToryText = styled.div`
  font-size: 36px;
`;
