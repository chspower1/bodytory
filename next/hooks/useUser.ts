import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { USE_USER } from "constant/queryKeys";

const useUser = () => {
  const { getApi } = customApi("/api/users/me");
  const { data: user, isFetching } = useQuery<User | string>([USE_USER], getApi);
  if (user === "로그인 되어있지 않습니다.") return { user: undefined, isFetching };
  else return { user: user as User, isFetching };
};
export default useUser;
