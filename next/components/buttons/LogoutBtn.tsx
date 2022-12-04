import customApi from "utils/client/customApi";
import { useRouter } from "next/router";
import { RoundButton } from "./Button";
import { loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { USER_LOGIN } from "constant/queryKeys";

const LogoutBtn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const handleClickLogout = async () => {
    try {
      setCurrentUser(null);
      queryClient.removeQueries({ queryKey: USER_LOGIN, exact: true });
      await LogoutApi({});
      router.push("/auth/login");
    } catch (err) {
      console.log("logout Err");
    }
  };
  return (
    <>
      <RoundButton size="md" onClick={handleClickLogout}>
        로그아웃
      </RoundButton>
    </>
  );
};
export default LogoutBtn;
