import { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { getAllArticleIds } from '@/content/articles';
import { getAllPlaygroundIds } from '@/content/playground';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = getAllArticleIds().map((id) => ({
    url: `${baseUrl}/articles/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic playground routes
  const playgroundRoutes: MetadataRoute.Sitemap = getAllPlaygroundIds().map((id) => ({
    url: `${baseUrl}/playground/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...playgroundRoutes];
}
