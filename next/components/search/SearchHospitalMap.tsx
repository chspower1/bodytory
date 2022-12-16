import useCoords from "@hooks/useCoords";
import { media, theme } from "@styles/theme";
import styled from "styled-components";
import { SearchContainer } from "./SearchHospitalList";
import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import ArroundMap, { NotAccessMessage } from "@components/map/ArroundMap";

const SearchHospitalMap = () => {
  const { latitude, longitude } = useCoords();

  return (
    <ShadowSearchContainer>
      {latitude && longitude ? (
        <ArroundMap
          longitude={longitude}
          latitude={latitude}
          departmentList={Object.values(MEDICALDEPARTMENT)}
          isAll={true}
        />
      ) : (
        <NotAccessMessage>
          위치를 파악할 수 없어요!
          <br />
          위치 엑세스를 허용해주세요
        </NotAccessMessage>
      )}
    </ShadowSearchContainer>
  );
};

const ShadowSearchContainer = styled(SearchContainer)`
  max-width: 1500px;
  width: 100%;
  height: 600px;
  margin: 0 auto 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 8px 8px 24px 0px rgba(49, 54, 167, 0.2);
  ${NotAccessMessage} {
    background: ${theme.color.white};
    color: ${theme.color.darkBg};
  }
  ${media.custom(1440)} {
    height: 600px;
  }
  ${media.mobile} {
    height: calc(100% - 300px);
    max-height: 100%;
    border-radius: 0;
  }
`;

export default SearchHospitalMap;
