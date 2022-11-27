import BodyNavigator from '@components/record/BodyNavigator';
import { SiteType } from 'pages/users/records/write';
import { useState } from 'react';
import styled from 'styled-components';

function SelectPart() {
  const [selectedSite, setSelectedSite] = useState<SiteType>(null);
  const [hoveredSite, setHoveredSite] = useState<string>("");

  return (
    <SelectPartWarp>
      <SelectPartContainer>
        <BodyNavigator
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          setHoveredSite={setHoveredSite}
          isRecordSiteSelected={selectedSite !== null}
        />
      </SelectPartContainer>
    </SelectPartWarp>
    
  )
}

const SelectPartWarp = styled.div`
    width: 37.5%;
    height: 100%;
`;

const SelectPartContainer = styled.div`
    width: 100%;
    max-width: 720px;
    height: 100%;
    margin: 0 auto;
`;




export default SelectPart