const URL_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`

export const URL_HOME = URL_BASE + "getMainPageData"
export const URL_PERSONAL_PRICING = URL_BASE + "getPersonalPricing"
export const URL_BUSINESS_PRICING = URL_BASE + "getBusinessPricing"

export const URL_PRIVACY = URL_BASE + "getPrivacyData?slug="