import Head from "next/head";
import { FC } from "react";

interface CustomSeoProps {
  seoData: { title?: string; description?: string };
}
const CustomSeo: FC<CustomSeoProps> = ({ seoData }) => {
  try {
    const { title, description } = seoData;
    return (
      <Head>
        <title>바디토리 | {title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
    );
  } catch {
    return (
      <Head>
        <title>바디토리</title>
        <meta name="description" content={"존재하지 않는 페이지입니다."} />
      </Head>
    );
  }
};

export default CustomSeo;
