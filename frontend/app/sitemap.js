export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formation-devops.vercel.app';

  const courses = [
    'artifactory', 'sonarqube', 'doors', 'clearcase', 'klocwork', 'jenkins',
    'jira', 'confluence', 'bitbucket', 'docker', 'kubernetes', 'terraform',
    'ansible', 'gitlab-ci', 'git-avance'
  ];

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/flashcards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/forum`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${baseUrl}/cheatsheets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const coursePages = courses.map(id => ({
    url: `${baseUrl}/courses/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cheatsheetTools = ['docker', 'kubernetes', 'terraform', 'ansible', 'git'];
  const cheatsheetPages = cheatsheetTools.map(tool => ({
    url: `${baseUrl}/cheatsheets/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...cheatsheetPages];
}
