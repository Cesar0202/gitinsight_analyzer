import { GitHubProvider } from './GitHubProvider';
import { GitLabProvider } from './GitLabProvider';

const providers = [GitHubProvider, GitLabProvider];

export const getProvider = (input) => {
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\?#]+)/i;
  const gitlabRegex = /(?:https?:\/\/)?(?:www\.)?gitlab\.com\/([^\/\?#]+)/i;

  const ghMatch = input.match(githubRegex);
  if (ghMatch) return { provider: GitHubProvider, username: ghMatch[1] };

  const glMatch = input.match(gitlabRegex);
  if (glMatch) return { provider: GitLabProvider, username: glMatch[1] };

  // Default to GitHub
  return { provider: GitHubProvider, username: input.trim() };
};
