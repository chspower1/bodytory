import DashBoard from "@components/records/DashBoard";
import SelectPart from "@components/records/SelectPart";
import styled from "styled-components"

export default function RecordPage() {
  return (
    <RecordWrap style={{background: "#F2F3FF"}}>
      <DashBoard />
      <SelectPart />
    </RecordWrap>
  )
}

const RecordWrap = styled.div`
  height: 100%;
`;
