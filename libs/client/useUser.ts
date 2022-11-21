import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import { USE_USER } from "constant/queryKeys";

const useUser = () => {
  const { getApi } = useApi("/api/users/me");
  const { data: user } = useQuery<User>([USE_USER], getApi);
  return { user };
};
export default useUser;
