import Link from "next/link";
import { ButtonSize, SocialButton } from "./Button";

const OriginLoginBtn = ({ size, kind }: { size: ButtonSize; kind: "login" | "register" }) => {
  return (
    <Link href="/auth/register">
      <SocialButton social="origin" size={size} bgColor={kind === "login" ? "rgb(75, 80, 211)" : "rgb(61, 66, 191)"}>
        일반 로그인
      </SocialButton>
    </Link>
  );
};
export default OriginLoginBtn;
