type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Renders schema.org structured data so search engines and AI agents can
 * reliably parse what each page is about ("agentic SEO").
 */
export default function JsonLd({ data }: { data: JsonLdData }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
