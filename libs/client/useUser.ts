import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
}
const useUser = () => {
  async function getUser() {
    return await axios.get("/api/users/me");
  }
  const { data: user } = useQuery(["user"], getUser);
  return { user };
};
export default useUser;
