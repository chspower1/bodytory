import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SocialButton } from "./SocialButton";

const OriginLoginBtn = ({ kind }: { kind: "login" | "register" }) => {
  const { push } = useRouter();
  const [comment, _] = useState(kind === "login" ? "로그인" : "회원가입");
  return (
    <SocialButton social="origin" onClick={() => push("/auth/register")}>
      일반 {comment}
    </SocialButton>
  );
};
export default OriginLoginBtn;
