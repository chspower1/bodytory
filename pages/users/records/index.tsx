import styled from "styled-components"
import DashBoard from "@components/records/DashBoard";
import SelectPart from "@components/records/SelectPart";
import Chart from "@components/records/Chart";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedBodyPart } from "atoms/atoms";
import { useEffect } from "react";


export default function RecordPage() {

  const [selectedPart, setSelectedPart] = useRecoilState(selectedBodyPart);

  useEffect(() => {
    setSelectedPart(null);
  }, []);

  return (
    <RecordWrap>
      {!selectedPart && <DashBoard />}
      <SelectPart />
      {selectedPart && <Chart />}
    </RecordWrap>
  )
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
