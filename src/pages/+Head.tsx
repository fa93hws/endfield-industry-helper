export function Head() {
  const title = '终末地基建助手';
  const description =
    '终末地（Endfield）基础设施生产配方查询和计算工具，帮助你查看和管理矿石、植物、药品、电池和装备组件的生产配方。';
  const url = 'https://endfield-infra-helper.example.com';
  const imageUrl = `${url}/og-image.png`;

  return (
    <>
      {/* Basic Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="终末地,Endfield,终末地基建,基建,生产配方,配方查询,计算器,配平,游戏工具,基建工具"
      />
      <meta name="author" content="Endfield Infra Helper" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  );
}
