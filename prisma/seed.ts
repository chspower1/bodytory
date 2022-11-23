import fs from "fs";
import test from "../data/hospital/hospital_수정03.json";
import areaCode from "../data/hospital/area_code.json";
import medicalCode from "../data/hospital/진료과목코드_수정02.json";
import hospitals from "../data/hospital/hospital_수정05.json";
import hospitals2 from "../data/hospital/hospital_수정06.json";
import hospitals3 from "../data/hospital/hospital_수정07.json";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
interface Hospital {
  id: number;
  areaCode: string | number;
  phone: string;
  address: string;
  name: string;
  departmentCodes: string | string[];
  departments: string | string[];
}
interface AreaCode {
  id: number;
  area: string;
  area2?: string;
  areaCode: string;
  areaCode2?: string;
}

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

// 지역코드 => 지역명
// function MappingAreaCode() {
//   const areaCodeData = areaCode as AreaCode[];
//   const data = test as Hospital[];
//   data.map(hospital => {
//     areaCodeData.forEach(code => {
//       if (code.areaCode === hospital.areaCode) {
//         hospital.areaCode = code.area;
//       } else if (code.areaCode2 === hospital.areaCode) {
//         hospital.areaCode = code.area2!;
//       }
//     });
//     return { ...hospital, phone: String(hospital.phone) };
//   });
//   console.log(data);
//   fs.writeFileSync("hospital_수정06.json", JSON.stringify(data));
// }
// MappingAreaCode();

// 진료과목 데이터 심기
// async function MedicalDepartment() {
//   const codes = medicalCode;
//   codes.forEach(async code => {
//     await client.medicalDepartment.create({
//       data: {
//         id: code.번호,
//         department: code.진료명,
//       },
//     });
//   });
// }
// MedicalDepartment();

// 진료과목 데이터 심기
// async function MedicalDepartment() {
//   const codes = medicalCode;
//   codes.forEach(async code => {
//     await client.medicalDepartment.create({
//       data: {
//         id: code.번호,
//         department: code.진료명,
//       },
//     });
//   });
// }
// MedicalDepartment();

// 병원 데이터 심기
// async function SeedHospital() {
//   await client.hospital.createMany({
//     data: hospitals3.map(hospital => ({
//       id: hospital.id,
//       area: hospital.area,
//       phone: hospital.phone,
//       address: hospital.address,
//       name: hospital.name,
//     })),
//     skipDuplicates: true,
//   });
// }
// SeedHospital();

// 전화번호 타입 수정 Number => String
// function ConvertHospitalPhone() {
//   const result = hospitals2.map((hospital: any) => {
//     return { ...hospital, phone: String(hospital.phone) };
//   });
//   fs.writeFileSync("hospital_수정07.json", JSON.stringify(result));
// }
// ConvertHospitalPhone();

// 병원 데이터 지우기
// async function Deletehospitals() {
//   await client.hospital.deleteMany({});
// }
// Deletehospitals();

// 병원 <-> 진료과 맵핑
// async function AddDepartmentToHospital() {
//   const data = hospitals3.slice(4300, 4644);
//   data.forEach((hospital, index) => {
//     const codeArr = [];
//     hospital.departments.forEach(async department => {
//       medicalCode.forEach(async code => {
//         if (code.진료명 === department) {
//           await client.hospital.update({
//             where: {
//               id: hospital.id,
//             },
//             data: {
//               medicalDepartments: {
//                 connect: {
//                   id: code.번호,
//                 },
//               },
//             },
//           });
//           console.log(4300 + index, " / 4644");
//         }
//       });
//     });
//   });
// }
// AddDepartmentToHospital();

// // 레코드 다 지우기
// async function DeleteRecords() {
//   await client.record.deleteMany({});
// }
// DeleteRecords();
