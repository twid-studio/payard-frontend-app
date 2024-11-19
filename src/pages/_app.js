import "@/styles/reset.scss";
import { CookiePopUp } from "@/utils/CookiePopUp/CookiePopUp";
import { AnimatePresence } from "framer-motion";
import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <GoogleAnalytics gaId="G-XG58B9L0S1" />{" "}
      <div className="main">
        <QueryClientProvider client={queryC}>
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
            <CookiePopUp />
          </AnimatePresence>
        </QueryClientProvider>
      </div>
    </>
  );
}
