import { Wrapper } from "@styles/Common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import HospitalHeader from "../header/HospitalHeader";

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("rgb(242, 243, 255)");
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    if (
      (router.pathname.includes("/auth") && !router.pathname.includes("/withdraw")) ||
      router.pathname.includes("/landing")
    )
      setBgColor("rgb(83, 89, 233)");
    else setBgColor("rgb(242, 243, 255)");
    if (router.pathname.includes("bodytory")) setIsScroll(true);
    if (!router.pathname.includes("bodytory")) setIsScroll(false);
  }, [router]);
  return (
    <Wrapper bgColor={bgColor} isScroll={isScroll}>
      {router.pathname.includes("/landing") ? null : router.pathname.includes("/hospital") ? (
        <HospitalHeader />
      ) : (
        <Header />
      )}
      {children}
    </Wrapper>
  );
};

export default Layout;
const getServerSideProps = () => {
  return { props: {} };
};
