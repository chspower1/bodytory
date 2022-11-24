import { Container, Wrapper } from "@styles/Common";

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Layout;
