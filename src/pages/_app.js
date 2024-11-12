import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import "@/styles/reset.scss";
import Header from "@/utils/Header/Header";
import { PageHead } from "@/utils/PageHead/PageHead";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryC = new QueryClient();

const data = {
  metaTitle: "Payard",
  openGraphImage:
    "https://cdn.sanity.io/images/k4iqfncy/production/d5c00b7271c78a3415e115387d99f58f596d15d1-1200x630.png",
  // keywords: ["dssdds", "dsdsdssd", "dsdssddsd"],
  // metaDescription: "dsdssds",
};

export default function App({ Component, pageProps, router }) {
  return (
    <div className="main">
      <PageHead data={data} />
      <QueryClientProvider client={queryC}>
        <ScrollProvider>
          <Header />
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </ScrollProvider>
      </QueryClientProvider>
    </div>
  );
}
