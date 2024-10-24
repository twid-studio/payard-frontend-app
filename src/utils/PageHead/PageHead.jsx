import Head from "next/head";

export const PageHead = ({ data }) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{data.documentTitle}</title>
      <meta name="description" content={data.documentDescription} />
      <meta name="keywords" content={data.documentKeywords} />
      <link rel="canonical" href={data.canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={data.documentTitle} />
      <meta property="og:description" content={data.documentDescription} />
      <meta property="og:image" content={data.documentImage} />
      <meta property="og:url" content={data.canonicalUrl} />
      <meta property="og:type" content={data.documentType || "website"} />
      <meta
        property="og:site_name"
        content={data.siteName || "Your Site Name"}
      />
      <meta property="og:locale" content={data.locale || "en_US"} />

      {/* Open Graph Article Meta Tags */}
      {data.documentType === "article" && (
        <>
          <meta
            property="article:published_time"
            content={data.publishedTime}
          />
          <meta property="article:modified_time" content={data.modifiedTime} />
          <meta property="article:author" content={data.authorName} />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.documentTitle} />
      <meta name="twitter:description" content={data.documentDescription} />
      <meta name="twitter:image" content={data.documentImage} />
      {data.twitterUsername && (
        <meta name="twitter:creator" content={data.twitterUsername} />
      )}

      {/* Image Meta Tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={data.documentTitle} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Apple Touch Icon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      {/* Viewport */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      {/* Character Set */}
      <meta charSet="utf-8" />

      {/* X-UA-Compatible */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};
