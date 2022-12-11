import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import customApi from "../utils/client/customApi";
import { USE_USER } from "constant/queryKeys";

const useUser = () => {
  const { getApi } = customApi("/api/users/me");
  const { data: user, isFetching } = useQuery<User>([USE_USER], getApi);

  return {user, isFetching};
};
export default useUser;
