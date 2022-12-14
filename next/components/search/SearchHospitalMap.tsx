import useCoords from "@hooks/useCoords";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { SearchContainer } from "./SearchHospitalList";
import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import { Box, Col } from "@styles/Common";
import HospitalIcon from "@src/assets/icons/hospital.svg";
import ArroundMap from "@components/map/ArroundMap";
import useDepartmentSelect from "@hooks/useDepartmentSelect";

const SearchHospitalMap = () => {
  const { latitude, longitude } = useCoords();

  return latitude && longitude ? (
    <ShadowSearchContainer>
      <ArroundMap width="1500px" height="600px" longitude={longitude} latitude={latitude} departmentList={Object.values(MEDICALDEPARTMENT)} isAll={true} />
    </ShadowSearchContainer>
  ) : (
    <SearchContainer>위치 정보를 허용해주세요!</SearchContainer>
  );
};

const ShadowSearchContainer = styled(SearchContainer)`
  max-width: 1500px;
  height: 600px;
  margin: 0 auto 0;
  border-radius: 20px;
  box-shadow: 8px 8px 24px 0px rgba(49, 54, 167, 0.2);
`;

export default SearchHospitalMap;