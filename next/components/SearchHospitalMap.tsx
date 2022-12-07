import useCoords from "@hooks/useCoords";
import { Hospital, MedicalDepartment } from "@prisma/client";
import { theme } from "@styles/theme";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { FormEvent, LegacyRef, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import HospitalContent from "./HospitalContent";
import ArroundMap from "./map/ArroundMap";
import { SearchContainer } from "./SearchHospitalList";
import ListSkeleton from "./skeletonUI/ListSkeleton";
import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
interface SearchHospitalMapProps {
  hospitals?: MyHospital[];
  add: boolean;
  setobserverTarget?: LegacyRef<HTMLDivElement> | null;
  isLoading?: boolean;
}
interface DepartmentSelectForm {
  department: string;
}
const SearchHospitalMap = () => {
  const { latitude, longitude } = useCoords();
  const { register, handleSubmit } = useForm<DepartmentSelectForm>();
  const [department, setDepartment] = useState("all");
  const onValid = (department: string) => {
    console.log("onValid", department);
    setDepartment(department);
  };

  return latitude && longitude ? (
    <SearchContainer>
      <div>진료과목</div>
      <select
        id="department"
        {...register("department", {
          onChange(e: React.FormEvent<HTMLSelectElement>) {
            console.log("change");
            onValid(e.currentTarget.value);
          },
        })}
      >
        <option value="all">전체</option>
        {Object.values(MEDICALDEPARTMENT).map(department => (
          <option key={department}>{department}</option>
        ))}
      </select>

      <ArroundMap width="1500px" height="600px" longitude={longitude} latitude={latitude} department={department} />
    </SearchContainer>
  ) : (
    <SearchContainer>위치 정보를 허용해주세요!</SearchContainer>
  );
};

export default SearchHospitalMap;
