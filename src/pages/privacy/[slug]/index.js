import { URL_PRIVACY, URL_SEO_BASE } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";
import dynamic from "next/dynamic";

const PrivacyPage = dynamic(
  () => import("@/components/PrivacyPage/PrivacyPage"),
  {
    ssr: false,
  }
);

const PolicyPage = ({ data, slug }) => {
  return (
    <>
      <PageHead data={data}/>
      <DataProvider url={URL_PRIVACY + slug}>
        <PrivacyPage key={slug} />
      </DataProvider>
    </>
  );
};

export default PolicyPage;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const response = await fetch(URL_SEO_BASE, {
      cache: "no-cache",
      revalidate: 100,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log("DATA ===>", data);

    return { props: { data, slug } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}

