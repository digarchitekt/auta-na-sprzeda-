import type { MetadataRoute } from 'next';
import { vehicles } from '@/data/vehicles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://autanasprzedaz.com';
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/auta`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/sprzedaj-auto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const vehicleUrls: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${base}/auta/${v.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticUrls, ...vehicleUrls];
}
