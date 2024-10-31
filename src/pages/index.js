import HomePage from "@/components/HomePage/HomePage";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";

const Home = () => {
  return (
    <>
      {/* <PageHead data={data} /> */}
      <DataProvider url={URL_HOME}>
        <HomePage />
      </DataProvider>
    </>
  );
};

export default Home;
