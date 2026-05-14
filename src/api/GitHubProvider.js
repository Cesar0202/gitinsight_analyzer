import axios from 'axios';

/**
 * Service to interact with GitHub API.
 * Implements the Provider interface logic.
 */
export const GitHubProvider = {
  name: 'github',
  
  async getUser(username) {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return {
      id: res.data.id,
      name: res.data.name || res.data.login,
      login: res.data.login,
      avatar_url: res.data.avatar_url,
      bio: res.data.bio,
      followers: res.data.followers,
      public_repos: res.data.public_repos,
      html_url: res.data.html_url,
      platform: 'github'
    };
  },

  async getRepositories(username) {
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    return res.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      html_url: repo.html_url
    }));
  }
};
