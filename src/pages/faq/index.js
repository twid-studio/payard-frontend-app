import { URL_FAQ } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";
import dynamic from "next/dynamic";

const FaqPage = dynamic(() => import('@/components/FaqPage/FaqPage'), {
  ssr: false,
});

const index = ({ data }) => {
  return (
    <>
      <PageHead data={data.seo} />
      <DataProvider url={URL_FAQ}>
        <FaqPage />
      </DataProvider>
    </>
  );
};

export default index;

export async function getServerSideProps() {
  try {
    const response = await fetch(URL_FAQ, {
      cache: "no-cache",
      revalidate: 100,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log("DATA ===>", data);

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
