import code from './final_hospital.json' assert { type: 'json' };
async function ConnectHospitalToDepartment() {
  const matchDepartment = code.value.slice(0, 100);
  const ASDF = (a) => {
    const arr = [];
    for (let i = 0; i < a.length; i++) {
      a[i].departmentCodes.forEach((j) => {
        arr.push({ hospitalId: a[i].index, medicalDepartmentId: j });
      });
    }
    return arr;
  };
  ASDF(matchDepartment);
}
ConnectHospitalToDepartment();
