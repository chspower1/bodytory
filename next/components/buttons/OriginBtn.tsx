import Link from "next/link";
import { useState } from "react";
import { ButtonSize, SocialButton } from "./Button";

const OriginLoginBtn = ({ size, kind }: { size: ButtonSize; kind: "login" | "register" }) => {
  const [comment, _] = useState(kind === "login" ? "로그인" : "회원가입");
  return (
    <Link href="/auth/register">
      <SocialButton social="origin" size={size} bgColor={kind === "login" ? "rgb(75, 80, 211)" : "rgb(61, 66, 191)"}>
        일반 {comment}
      </SocialButton>
    </Link>
  );
};
export default OriginLoginBtn;
