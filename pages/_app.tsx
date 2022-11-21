import "@styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@components/Layout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60 * 5,
      onError(err) {
        console.log(err);
      },
    },
    mutations: {
      onError(error: any) {
        if (error.status === 400) {
        }
      },
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
    <QueryClientProvider client={queryClient}>
      {/* <ErrorBoundary fallback={<div>에러</div>}> */}
      <Suspense fallback={<div>로딩중</div>}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
      {/* </ErrorBoundary> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
