import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@components/layout/Layout";
import GlobalStyled from "@styles/GlobalStyled";
import Head from "next/head";
import { theme } from "@styles/theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import "@public/static/fonts/pretendardvariable.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
      cacheTime: 1000 * 60 * 5,
      onError(error: any) {},
    },
  },
});

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>바디토리</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
