import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useApi from "./useApi";
const useUser = () => {
  const { getApi } = useApi("/api/users/me");
  const { data: user } = useQuery<User>(["user"], getApi);
  console.log(user);
  return { user };
};
export default useUser;
