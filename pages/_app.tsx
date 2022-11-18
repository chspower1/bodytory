import "@styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" />
      <script src="https://developers.kakao.com/sdk/js/kakao.js" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
