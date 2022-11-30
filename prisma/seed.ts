import hospitalsSample from "../data/new-hospital/hospital_final.json";
import departmentMatch from "./dd.json";
// import DepartmentsSample from "../data/new-hospital/code_final.json";
// import type { Hospital, MedicalDepartment } from "prisma/prisma-client";
// import fs from "fs";
import { PrismaClient } from "@prisma/client";
// import hospital from "@api/users/hospital";
import medicalDepartmentData from "../data/hospital/진료과목코드_수정02.json";
const client = new PrismaClient();

interface Department {
  name: string;
  departmentCode: number;
  department: string;
}
interface Match {
  index: number;
  name: string;
  departmentCodes: number[];
}

async function ConnectHospitalToDepartment() {
  const matchDepartment: Match[] = departmentMatch.value;
  // const matchDepartment = fs.readFileSync("../data/new-hospital/code_final.json");
  // console.log(matchDepartment);
  console.log("dfdsfd");
  const ASDF = (a: Match[]) => {
    const arr: { hospitalId: number; medicalDepartmentId: number }[] = [];
    for (let i = 0; i < a.length; i++) {
      a[i].departmentCodes.forEach(j => {
        arr.push({ hospitalId: a[i].index, medicalDepartmentId: j });
      });
    }
    return arr;
  };
  ASDF(matchDepartment);
  await client.hospitalToMedicalDepartMentConnector.createMany({
    data: ASDF(matchDepartment),
  });
}
ConnectHospitalToDepartment();

// 병원 데이터 지우기
// async function Deletehospitals() {
//   console.log("dddd");
//   await client.hospital.deleteMany({});
// }
// Deletehospitals();

// // 레코드 다 지우기
// async function DeleteRecords() {
//   await client.record.deleteMany({});
// }
// DeleteRecords();

// async function DeleteMedicalDepartment() {
//   await client.hospitalToMedicalDepartMentConnector.deleteMany({});
// }
// DeleteMedicalDepartment();

// async function DeleteHospital() {
//   await client.hospital.deleteMany({});
// }
// DeleteHospital();

// async function FindMedicalDepartMent() {
//   const result = await client.medicalDepartment.findMany({
//     select: {
//       id: true,
//       department: true,
//       _count: true,
//     },
//   });
//   console.log(result);
// }
// FindMedicalDepartMent();
interface Hospital {
  name: string;
  classCode: number;
  class: string;
  areaCode: number;
  area: string;
  city: number;
  cityCode: string;
  address: string;
  homepage: string;
  coords: {
    x: number;
    y: number;
  };
  departmentCodes: string;
}
// async function CreateHospitals2() {
//   const hospitals: Hospital[] = hospitalsSample.value.slice(60000);
//   await client.hospital.createMany({
//     data: hospitals.map((hospital, index) => ({
//       address: hospital.address,
//       area: hospital.area,
//       city: hospital.cityCode,
//       class: hospital.class,
//       name: hospital.name,
//       homepage: hospital.homepage,
//       x: hospital.coords.x,
//       y: hospital.coords.y,
//     })),
//     skipDuplicates: true,
//   });
// }
// CreateHospitals2();

// async function CreateMedicalDepartment() {
//   const id = Object.keys(medicalDepartmentData);
//   const value = Object.values(medicalDepartmentData);
//   await client.medicalDepartment.createMany({
//     data: id.map((id, index) => ({
//       id: parseInt(id),
//       department: value[index],
//     })),
//   });
// }
// CreateMedicalDepartment();
