import Head from "next/head";
import { FC } from "react";

interface CustomSeoProps {
  seoData: { title: string; description: string };
}
const CustomSeo: FC<CustomSeoProps> = ({ seoData: { title, description } }) => {
  return (
    <Head>
      <title>바디토리 | {title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default CustomSeo;
