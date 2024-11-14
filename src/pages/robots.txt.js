export async function getServerSideProps({ res }) {
  const baseUrl = process.env.BASE_URL; // Fallback if not set

  const robots = `
    User-agent: *
    Allow: /
    Disallow: /privacy/
    
    Sitemap: ${baseUrl}sitemap.xml
  `;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return { props: {} };
}

export default function Robots() {
  return null; // No rendering needed
}
