import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface DepartmentSelectForm {
  department: string;
}

const useDepartmentSelect = (departments: string[]) => {
  const [department, setDepartment] = useState("all");
  const { register } = useForm<DepartmentSelectForm>();
  const onValid = useCallback((department: string) => {
    console.log("onValid", department);
    setDepartment(department);
  }, []);
  const DepartmentSelect = () => {
    return (
      <DepartmentSelectBox
        id="department"
        {...register("department", {
          onChange(e: React.FormEvent<HTMLSelectElement>) {
            console.log("change");
            onValid(e.currentTarget.value);
          },
        })}
      >
        <option value="all">전체</option>
        {departments.map(department => (
          <option key={department}>{department}</option>
        ))}
      </DepartmentSelectBox>
    );
  };
  return { department, DepartmentSelect };
};
export default useDepartmentSelect;
const DepartmentSelectBox = styled.select`
  border: 1px solid rgba(54, 60, 191, 0.4);
  /* padding-left: 10px; */
  width: 200px;
  height: 35px;
  padding-left: 10px;
`;
