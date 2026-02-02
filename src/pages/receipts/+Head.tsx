export function Head() {
  const title = '配方查询 - 终末地基建助手';
  const description = '查看终末地（Endfield）所有生产配方，包括矿石加工、植物种植、药品制作、电池生产和装备组件制造。支持配方搜索和分类浏览。';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Structured Data - ItemList */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description: description,
          isPartOf: {
            '@type': 'WebApplication',
            name: '终末地基建助手',
          },
        })}
      </script>
    </>
  );
}
