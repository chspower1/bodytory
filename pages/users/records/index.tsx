import styled from "styled-components"
import DashBoard from "@components/records/DashBoard";
import SelectPart from "@components/records/SelectPart";
import Chart from "@components/records/Chart";

export default function RecordPage() {
  return (
    <RecordWrap style={{background: "#F2F3FF"}}>
      {/* <DashBoard /> */}
      <SelectPart />
      <Chart />
    </RecordWrap>
  )
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
