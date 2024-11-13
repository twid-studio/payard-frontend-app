import "@/styles/reset.scss";
import { CookiePopUp } from "@/utils/CookiePopUp/CookiePopUp";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <div className="main">
      <QueryClientProvider client={queryC}>
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
          <CookiePopUp />
        </AnimatePresence>
      </QueryClientProvider>
    </div>
  );
}
