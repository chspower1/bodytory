import customApi from "utils/client/customApi";
import { useRouter } from "next/router";
import { RoundButton } from "./Button";
import { currentPatientInfo, loggedInHospital, loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { HOSPITAL_LOGIN, USER_LOGIN } from "constant/queryKeys";

const LogoutBtn = ({isHospital}:{isHospital ?:boolean;}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const setCurrentHospital = useSetRecoilState(loggedInHospital);
  const setCurrentPatientInfo = useSetRecoilState(currentPatientInfo);
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const handleClickLogout = async () => {
    try {
      setCurrentUser(null);
      setCurrentHospital(null);
      setCurrentPatientInfo({
        name : "",
        id: null
      });
      queryClient.removeQueries({ queryKey: isHospital ? [HOSPITAL_LOGIN] : [USER_LOGIN] });
      await LogoutApi({});
      router.push(isHospital ? "/hospital/login" :"/auth/login");
    } catch (err) {
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
