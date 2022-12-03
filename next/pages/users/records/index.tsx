import styled from "styled-components";
import DashBoard from "@components/records/dashborad/DashBoard";
import SelectPart from "@components/records/SelectBodyPart";

export default function RecordPage() {

  return (
    <RecordWrap>
      <DashBoard />
      <SelectPart />
    </RecordWrap>
  );
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
