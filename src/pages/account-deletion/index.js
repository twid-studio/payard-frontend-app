import { URL_FOOTER, URL_HOME } from '@/lib/helpers/DataUrls'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import DeletionForm from '@/utils/DeletionForm/DeletionForm'
import { PageHead } from '@/utils/PageHead/PageHead'
import { PageLayout } from '@/utils/PageLayout/PageLayout'
import React from 'react'

const index = ({ data }) => {
  console.log(data);
  
  return (
    <>
      <PageHead data={data.seo}/>
      <PageLayout showForm={false}>
        <DataProvider url={URL_FOOTER}>
          <DeletionForm />
        </DataProvider>
      </PageLayout>
    </>
  )
}

export default index;

export async function getServerSideProps() {
  try {
    const response = await fetch(URL_HOME, {
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
