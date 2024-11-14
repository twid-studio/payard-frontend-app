export const seoPage = `
  "seo": {
    "pageTitle": coalesce(
      seo.pageTitle, 
    *[_type == "defaultSeo"][0].seo.pageTitle
    ),
    "metaTitle": coalesce(
      seo.metaTitle, 
    *[_type == "defaultSeo"][0].seo.metaTitle
    ),
    "metaDescription": coalesce(
      seo.metaDescription,
      *[_type == "defaultSeo"][0].seo.metaDescription
    ),
    "keywords": coalesce(
      seo.keywords,
      *[_type == "defaultSeo"][0].seo.keywords
    ),
    "openGraphImage": coalesce(
      seo.openGraphImage, 
      *[_type == "defaultSeo"][0].seo.openGraphImage
    ).asset -> url,
  }
`
