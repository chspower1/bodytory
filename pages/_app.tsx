import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@components/Layout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GlobalStyled from "@styles/GlobalStyled";
import Head from "next/head";
import { theme } from "@styles/theme";
import { ThemeProvider } from "styled-components";
import Header from "@components/header/Header";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // useErrorBoundary: true,
      // suspense: true,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
    mutations: {
      // useErrorBoundary: true,
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
          {/* <ErrorBoundary fallback={<div>에러</div>}>
            <Suspense fallback={<div>로딩중</div>}> */}
          <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Header />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
          {/* </Suspense>
          </ErrorBoundary> */}
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
