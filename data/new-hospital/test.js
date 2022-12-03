import departments from "./code_final.json" assert { type: "json" };
import code from "./final_hospital.json" assert { type: "json" };
// interface Match {
//   index: number;
//   name: string;
//   departmentCodes: number[];
// }
async function ConnectHospitalToDepartment() {
  console.log("dsfa");
  const matchDepartment = code.value.slice(0, 100);
  console.log("dfdsfd");
  const ASDF = a => {
    const arr = [];
    for (let i = 0; i < a.length; i++) {
      a[i].departmentCodes.forEach(j => {
        arr.push({ hospitalId: a[i].index, medicalDepartmentId: j });
      });
    }
    console.log(arr);
    return arr;
  };
  ASDF(matchDepartment);
}
ConnectHospitalToDepartment();
