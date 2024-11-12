// App.js
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import "@/styles/reset.scss";
import Header from "@/utils/Header/Header";
import { PageHead } from "@/utils/PageHead/PageHead";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <div className="main">
      <QueryClientProvider client={queryC}>
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </QueryClientProvider>
    </div>
  );
}
