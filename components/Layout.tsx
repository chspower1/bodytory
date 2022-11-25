import { Wrapper } from "@styles/Common";
import Header from "./header/Header";

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Layout;
