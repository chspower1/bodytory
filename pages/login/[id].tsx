import { useRouter } from "next/router";
import { useEffect } from "react";
const LoginDetail = ({ id }: { id: number }) => {
  console.log(id);
  const router = useRouter();
  const { query } = router;
  console.log(router);
  // useEffect(() => {
  //   router.replace("/");
  // }, []);
  return <div>디테일페이지</div>;
};
export default LoginDetail;

export function getServerSideProps() {
  const data = 1;
  return {
    props: {
      id: data,
    },
  };
}
