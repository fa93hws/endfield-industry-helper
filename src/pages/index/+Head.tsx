export function Head() {
  const title = '终末地基建助手 - Endfield 生产配方查询工具';
  const description = '终末地（Endfield）基础设施生产配方查询和计算工具，帮助你查看和管理矿石、植物、药品、电池和装备组件的生产配方。快速查询配方，优化生产链，提升基建效率。';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: '终末地基建助手',
          description: description,
          applicationCategory: 'GameApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CNY',
          },
        })}
      </script>
    </>
  );
}
