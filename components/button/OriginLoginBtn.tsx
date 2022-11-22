import Link from "next/link";
import { ButtonSize, SocialButton } from "./Button";

const OriginLoginBtn = ({ size }: { size: ButtonSize }) => {
  return (
    <SocialButton social="origin" size={size} bgColor="#4B50D3">
      <Link href="/auth/register">
        <button>일반 로그인</button>
      </Link>
    </SocialButton>
  );
};
export default OriginLoginBtn;
