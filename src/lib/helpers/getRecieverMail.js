export default async function getRecieverMail() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/getFooterData`);
    if (!response.ok) {
      throw new Error("Failed to fetch footer data");
    }
    const data = await response.json();
    return data.form.email;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error;
  }
}
