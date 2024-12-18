const URL_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`

export const URL_HEADER = URL_BASE + "getHeaderData"
export const URL_FOOTER = URL_BASE + "getFooterData"

export const URL_HOME = URL_BASE + "getMainPageData"
export const URL_PERSONAL_PRICING = URL_BASE + "getPersonalPricing"
export const URL_BUSINESS_PRICING = URL_BASE + "getBusinessPricing"

export const URL_FAQ = URL_BASE + "getFaqPageData"

export const URL_PRIVACY = URL_BASE + "getPrivacyData?slug="
export const URL_SEO_BASE = URL_BASE + "getSeoData"