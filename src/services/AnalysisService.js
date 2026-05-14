export class AnalysisService {
  /**
   * Calcula estadísticas detalladas a partir del perfil y repositorios.
   */
  static calculateStats(user, repositories) {
    if (!user || !repositories) return null;

    // Diccionario para normalizar y agrupar tecnologías
    const TECH_MAP = {
      'react': 'React', 'reactjs': 'React', 'react-js': 'React',
      'node': 'Node.js', 'nodejs': 'Node.js', 'node-js': 'Node.js',
      'mongodb': 'MongoDB', 'mongo': 'MongoDB',
      'express': 'Express', 'expressjs': 'Express',
      'angular': 'Angular', 'angularjs': 'Angular',
      'vue': 'Vue.js', 'vuejs': 'Vue.js',
      'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
      'mysql': 'MySQL',
      'docker': 'Docker',
      'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
      'aws': 'AWS', 'amazon': 'AWS',
      'google-cloud': 'Google Cloud', 'gcp': 'Google Cloud',
      'azure': 'Azure',
      'springboot': 'Spring Boot', 'spring-boot': 'Spring Boot',
      'dotnet': '.NET', 'aspnet': '.NET', 'csharp': 'C#',
      'rails': 'Ruby on Rails', 'ruby-on-rails': 'Ruby on Rails',
      'php': 'PHP', 'laravel': 'Laravel',
      'typescript': 'TypeScript', 'ts': 'TypeScript',
      'javascript': 'JavaScript', 'js': 'JavaScript',
      'python': 'Python', 'django': 'Django', 'flask': 'Flask', 'fastapi': 'FastAPI',
      'go': 'Go', 'golang': 'Go',
      'rust': 'Rust',
      'redis': 'Redis',
      'graphql': 'GraphQL',
      'tailwind': 'Tailwind CSS', 'tailwindcss': 'Tailwind CSS',
      'bootstrap': 'Bootstrap',
      'sass': 'Sass', 'scss': 'Sass',
      'vite': 'Vite',
      'webpack': 'Webpack',
      'firebase': 'Firebase',
      'supabase': 'Supabase',
      'prisma': 'Prisma',
      'nextjs': 'Next.js', 'next.js': 'Next.js',
      'nuxtjs': 'Nuxt.js', 'nuxt.js': 'Nuxt.js',
      'svelte': 'Svelte', 'sveltekit': 'SvelteKit',
      'astro': 'Astro',
      'flutter': 'Flutter',
      'dart': 'Dart',
      'kotlin': 'Kotlin',
      'swift': 'Swift',
      'redux': 'Redux',
      'nest': 'NestJS', 'nestjs': 'NestJS',
      'terraform': 'Terraform',
      'ansible': 'Ansible',
      'jenkins': 'Jenkins',
      'vercel': 'Vercel',
      'netlify': 'Netlify'
    };

    const techScores = {};

    repositories.forEach(repo => {
      // Espacio de búsqueda: nombre, descripción, lenguaje y tópicos
      const searchSpace = [
        repo.name,
        repo.description,
        repo.language,
        ...(repo.topics || [])
      ].filter(Boolean).map(s => s.toLowerCase());

      // Mapeo activo de tecnologías basado en el diccionario
      Object.entries(TECH_MAP).forEach(([key, officialName]) => {
        const found = searchSpace.some(s => {
          const regex = new RegExp(`\\b${key}\\b`, 'i');
          return regex.test(s) || s.includes(key);
        });

        if (found) {
          techScores[officialName] = (techScores[officialName] || 0) + 1;
        }
      });

      // Incluir lenguajes no mapeados en el diccionario
      if (repo.language && !Object.keys(TECH_MAP).includes(repo.language.toLowerCase())) {
        techScores[repo.language] = (techScores[repo.language] || 0) + 1;
      }
    });

    // Ordenar por relevancia y limitar a los mejores 25
    const langData = Object.entries(techScores)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 25);

    // Cálculos de métricas globales
    const totalStars = repositories.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const totalForks = repositories.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
    
    // Cálculo del puntaje de actividad (0-100)
    const activityScore = Math.min(100, Math.round(
      (repositories.length * 1.5) + 
      (totalStars * 0.5) + 
      (user.followers * 0.2)
    ));

    // Datos para el gráfico de radar
    const radarData = [
      { subject: 'Consistencia', A: Math.min(100, (repositories.length / 5) * 10), fullMark: 100 },
      { subject: 'Calidad', A: Math.min(100, (totalStars / Math.max(1, repositories.length)) * 10), fullMark: 100 },
      { subject: 'Popularidad', A: Math.min(100, (totalStars + (user.followers || 0)) / 10), fullMark: 100 },
      { subject: 'Comunidad', A: Math.min(100, (totalForks / Math.max(1, repositories.length)) * 20), fullMark: 100 },
      { subject: 'Código Abierto', A: Math.min(100, (repositories.filter(r => !r.fork).length / Math.max(1, repositories.length)) * 100), fullMark: 100 },
    ];

    return { activityScore, totalStars, totalForks, langData, radarData, insights: [] };
  }
}
