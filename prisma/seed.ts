import fs from "fs";
import test from "../data/hospital/hospital_수정03.json";
interface Hospital {
  id: number;
  areaCode: string;
  phone: string;
  address: string;
  name: string;
  departmentCodes: string | string[];
  departments: string | string[];
}
interface AreaCode{
    id: 1,
    area: "종로구",
    areaCode: "3000000"
  },

// 진료목록 string => list
// function ConvertHospital() {
//   const data = test as Hospital[];
//   console.log(data);
//   const result = data.map(prev => ({
//     ...prev,
//     departmentCodes: String(prev.departmentCodes).split(" "),
//     departments: String(prev.departments).split(", "),
//   }));
//   fs.writeFileSync("hospital_수정3.json", JSON.stringify(result));
// }

// function MappingAreaCode(){
//     const data = test as Hospital[];
//     data.map(prev=>({...prev,areaCode}))
// }