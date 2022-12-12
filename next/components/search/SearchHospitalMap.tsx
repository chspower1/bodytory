import useCoords from "@hooks/useCoords";
import { Hospital, MedicalDepartment } from "@prisma/client";
import { theme } from "@styles/theme";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { FormEvent, LegacyRef, MouseEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { SearchContainer } from "./SearchHospitalList";
import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import { Box, Col, Row } from "@styles/Common";
import HospitalIcon from "@src/assets/icons/hospital.svg";
import ArroundMap from "@components/map/ArroundMap";
import useDepartmentSelect from "@hooks/useDepartmentSelect";

interface DepartmentSelectForm {
  department: string;
}
const SearchHospitalMap = () => {
  const { latitude, longitude } = useCoords();
  const { department, DepartmentSelect } = useDepartmentSelect(Object.values(MEDICALDEPARTMENT), true);

  return latitude && longitude ? (
    <SearchContainer style={{ alignItems: "flex-end" }}>
      <OptionBox>
        <DepartmentSelectBox>
          <DepartmentLabel>
            <HospitalIcon width={20} height={20} fill={theme.color.darkBg} />
            진료과목
          </DepartmentLabel>
          <DepartmentSelect />
        </DepartmentSelectBox>
      </OptionBox>
      <ArroundMap width="1500px" height="600px" longitude={longitude} latitude={latitude} department={department} />
    </SearchContainer>
  ) : (
    <SearchContainer>위치 정보를 허용해주세요!</SearchContainer>
  );
};

export default SearchHospitalMap;
const OptionBox = styled(Box)`
  width: 100%;
  justify-content: flex-end;
`;

const DepartmentSelectBox = styled(Col)`
  gap: 3px;
  align-items: flex-start;
  transform: translateY(-30%);
`;
const DepartmentLabel = styled(Box)`
  font-size: 20px;
  color: ${props => props.theme.color.text};
  font-weight: 500;
  gap: 5px;
`;
