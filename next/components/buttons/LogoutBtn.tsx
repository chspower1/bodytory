import customApi from "utils/client/customApi";
import { useRouter } from "next/router";
import { RoundButton } from "./Button";
import { loggedInHospital, loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { HOSPITAL_LOGIN, USER_LOGIN } from "constant/queryKeys";

const LogoutBtn = ({isHospital}:{isHospital ?:boolean;}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const setCurrentHospital = useSetRecoilState(loggedInHospital);
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const handleClickLogout = async () => {
    try {
      setCurrentUser(null);
      setCurrentHospital(null);
      queryClient.removeQueries({ queryKey: isHospital ? [HOSPITAL_LOGIN] :[USER_LOGIN] });
      await LogoutApi({});
      router.push(isHospital ? "/hospital/login" :"/auth/login");
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
