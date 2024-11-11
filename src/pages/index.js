// import HomePage from "@/components/HomePage/HomePage";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import('@/components/HomePage/HomePage'), {
  ssr: false,
});


const Home = () => {
  return (
    <DataProvider url={URL_HOME}>
      <HomePage />
    </DataProvider>
  );
};

export default Home;
