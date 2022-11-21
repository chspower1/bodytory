import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { USE_USER } from "constant/queryKeys";

const useUser = () => {
  async function getUser() {
    return await axios.get("/api/users/me");
  }
  const { data: user } = useQuery<User>([USE_USER], getUser);
  return { user };
};
export default useUser;
