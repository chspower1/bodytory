import { MEDICALDEPARTMENT } from "constant/MedicalDepartment";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface DepartmentSelectForm {
  department: string;
}

const useDepartmentSelect = (departments: string[], isAll?: boolean) => {
  console.log(departments, departments.length === 0);
  const isDepartmentsEmpty = departments.length === 0;
  const defaultDepartment = isAll ? "all" : isDepartmentsEmpty ? "all" : departments[0];
  const [department, setDepartment] = useState(defaultDepartment);
  const { register } = useForm<DepartmentSelectForm>();
  const onValid = useCallback((department: string) => {
    console.log("onValid", department);
    setDepartment(department);
  }, []);

  const DepartmentSelect = () => {
    return !isDepartmentsEmpty ? (
      <DepartmentSelectBox
        id="department"
        {...register("department", {
          onChange(e: React.FormEvent<HTMLSelectElement>) {
            console.log("change");
            onValid(e.currentTarget.value);
          },
        })}
      >
        {isAll && <option value="all">전체</option>}
        {departments.map((department, index) => (
          <option key={department} defaultChecked={index === 0}>
            {department}
          </option>
        ))}
      </DepartmentSelectBox>
    ) : null;
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
