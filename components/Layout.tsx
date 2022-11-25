import { Wrapper } from "@styles/Common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("rgb(242, 243, 255)");
  useEffect(() => {
    if (router.pathname.includes("/auth")) setBgColor("rgb(83, 89, 233)");
    else setBgColor("rgb(242, 243, 255)");
  }, [router]);
  return <Wrapper bgColor={bgColor}>{children}</Wrapper>;
};

export default Layout;
