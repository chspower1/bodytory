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
  async function D() {
    const user = await axios.get("/api/users/me");
    return user.data.user as User;
  }
  const { data } = useQuery(["user"], D);
  console.log(data);
  return { user: data };
};
export default useUser;
