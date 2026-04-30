import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  return {
    rules: isProd
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: isProd ? 'https://autanasprzedaz.com/sitemap.xml' : undefined,
  };
}
