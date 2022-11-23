import Link from "next/link";
import { ButtonSize, SocialButton } from "./Button";

const OriginLoginBtn = ({ size }: { size: ButtonSize }) => {
  return (
    <Link href="/auth/register">
      <SocialButton social="origin" size={size} bgColor="rgb(75, 80, 211)">
        일반 로그인
      </SocialButton>
    </Link>
  );
};
export default OriginLoginBtn;
