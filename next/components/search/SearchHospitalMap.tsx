import useCoords from "@hooks/useCoords";
import { media, theme } from "@styles/theme";
import styled from "styled-components";
import { SearchContainer } from "./SearchHospitalList";
import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import { Box, Col } from "@styles/Common";
import HospitalIcon from "@src/assets/icons/hospital.svg";
import ArroundMap from "@components/map/ArroundMap";
import useDepartmentSelect from "@hooks/useDepartmentSelect";
// ${media.custom(1440)} {
//   padding: 0 100px;
// }
// ${media.tablet} {
//   padding: 20px;
// }
// ${media.mobile} {
//   width: 100%;
//   height: 100%;
//   padding: 10px;
// }
const SearchHospitalMap = () => {
  const { latitude, longitude } = useCoords();

  return latitude && longitude ? (
    <ShadowSearchContainer>
      <ArroundMap
        // width="1500px"
        // height="600px"
        longitude={longitude}
        latitude={latitude}
        departmentList={Object.values(MEDICALDEPARTMENT)}
        isAll={true}
      />
    </ShadowSearchContainer>
  ) : (
    <SearchContainer>위치 정보를 허용해주세요!</SearchContainer>
  );
};

const ShadowSearchContainer = styled(SearchContainer)`
  max-width: 1500px;
  width: 100%;
  height: 600px;
  margin: 0 auto 0;
  border-radius: 20px;
  box-shadow: 8px 8px 24px 0px rgba(49, 54, 167, 0.2);
  ${media.custom(1440)} {
    height: 600px;
  }
  ${media.mobile} {
    height: calc(100% - 300px);
    max-height: 100%;
  }
`;

export default SearchHospitalMap;
