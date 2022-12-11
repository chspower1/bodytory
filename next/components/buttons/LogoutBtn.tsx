import customApi from "utils/client/customApi";
import { useRouter } from "next/router";
import { RoundButton } from "./Button";
import { currentPatientInfo, loggedInHospital } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import {
  AI_RESULT_READ,
  BODYPART_CHARTDATA_READ,
  HOSPITALS,
  HOSPITAL_LOGIN,
  KEYWORDS_CHARTDATA_READ,
  USER_LOGIN,
  USE_USER,
} from "constant/queryKeys";

const LogoutBtn = ({ isHospital }: { isHospital?: boolean }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCurrentHospital = useSetRecoilState(loggedInHospital);
  const setCurrentPatientInfo = useSetRecoilState(currentPatientInfo);
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const handleClickLogout = async () => {
    try {
      setCurrentHospital(null);
      setCurrentPatientInfo({
        name: "",
        id: null,
      });
      queryClient.clear();
      await LogoutApi({});
      router.push(isHospital ? "/hospital/login" : "/auth/login");
    } catch (err) {
      console.log("logout Err");
    }
  };
  return (
    <>
      <RoundButton size={isHospital ? "sm" : "md"} onClick={handleClickLogout}>
        로그아웃
      </RoundButton>
    </>
  );
};
export default LogoutBtn;
