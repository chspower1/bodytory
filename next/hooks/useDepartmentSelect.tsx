import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ArrowIcon from "@src/assets/icons/icon_select_arrow.png";
import { media } from "@styles/theme";

interface DepartmentSelectForm {
  department: string;
}

const useDepartmentSelect = (departments: string[], isAll?: boolean) => {
  const isDepartmentsEmpty = departments.length === 0;
  const defaultDepartment = isAll ? "all" : isDepartmentsEmpty ? "all" : departments[0];
  const [department, setDepartment] = useState(defaultDepartment);
  const { register } = useForm<DepartmentSelectForm>();
  const onValid = useCallback((department: string) => {
    setDepartment(department);
  }, []);

  const DepartmentSelect = () => {
    return !isDepartmentsEmpty ? (
      <SelectWrap>
        <DepartmentSelectBox
          id="department"
          {...register("department", {
            onChange(e: React.FormEvent<HTMLSelectElement>) {
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
      </SelectWrap>
    ) : null;
  };
  return { department, DepartmentSelect };
};

export default useDepartmentSelect;

const SelectWrap = styled.div`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    width: 10px;
    height: 10px;
    background: url(${ArrowIcon.src}) no-repeat 50% 50% / contain;
    z-index: 5;
  }
  ${media.mobile} {
  }
`;

const DepartmentSelectBox = styled.select`
  border: 2px solid #5359e9;
  padding: 10px 35px 10px 20px;
  border-radius: 20px;
  width: 210px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  ${media.mobile} {
    width: 100px;
  }
`;
