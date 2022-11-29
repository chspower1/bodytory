import styled from "styled-components"
import DashBoard from "@components/records/DashBoard";
import SelectPart from "@components/records/SelectPart";
import Chart from "@components/records/Chart";
import { useEffect, useState } from "react";
import { bodyPartType } from "types/bodyParts";


export default function RecordPage() {
  const [isSelected, setIsSelected] = useState(false);                        // 부위를 선택했는지 true false
  const [selectedSite, setSelectedSite] = useState<bodyPartType>(null);       // 어떤 부위를 선택했는지
  const [hoveredSite, setHoveredSite] = useState<string>("");                 // 어떤 부위를 마우스오버했는지

  return (
    <RecordWrap>
      {!isSelected && <DashBoard />}
      <SelectPart  
        isSelected={isSelected} 
        setIsSelected={setIsSelected}
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        hoveredSite={hoveredSite}
        setHoveredSite={setHoveredSite}
      />
      {isSelected && <Chart 
        selectedSite={selectedSite}
      />}
    </RecordWrap>
  )
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
