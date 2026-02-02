export function Head() {
  const title = '生产计算器 - 终末地基建助手';
  const description = '终末地（Endfield）生产链计算器，选择目标产品和数量，自动计算所需的自然资源和中间产品。支持多配方选择，优化生产链，提升基建效率。';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Structured Data - SoftwareApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: description,
          isPartOf: {
            '@type': 'WebApplication',
            name: '终末地基建助手',
          },
          potentialAction: {
            '@type': 'CalculateAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://endfield-infra-helper.example.com/calculator',
            },
          },
        })}
      </script>
    </>
  );
}
