import { Container } from "@styles/Common";
import React from "react";
import styled from "styled-components";

export default function RecordPage() {
  return (
    <Container>
      <BlackToryText>증상을 기록할 부위를 선택해주세요</BlackToryText>
    </Container>
  );
}
const BlackToryText = styled.div`
  font-size: 36px;
`;
