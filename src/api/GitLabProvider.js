import axios from 'axios';

/**
 * Service to interact with GitLab API.
 */
export const GitLabProvider = {
  name: 'gitlab',

  async getUser(username) {
    const searchRes = await axios.get(`https://gitlab.com/api/v4/users?username=${username}`);
    if (!searchRes.data.length) throw new Error('404');
    
    const userId = searchRes.data[0].id;
    const res = await axios.get(`https://gitlab.com/api/v4/users/${userId}`);
    
    return {
      id: res.data.id,
      name: res.data.name,
      login: res.data.username,
      avatar_url: res.data.avatar_url,
      bio: res.data.bio,
      followers: res.data.followers || 0,
      public_repos: 0, // Will be updated by repositories count
      html_url: res.data.web_url,
      platform: 'gitlab'
    };
  },

  async getRepositories(username) {
    // Need to find ID again or pass it. For simplicity in this structure:
    const searchRes = await axios.get(`https://gitlab.com/api/v4/users?username=${username}`);
    const userId = searchRes.data[0].id;
    
    const res = await axios.get(`https://gitlab.com/api/v4/users/${userId}/projects?per_page=100&order_by=updated_at`);
    return res.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: null, // GitLab limited language info in this endpoint
      stargazers_count: repo.star_count,
      forks_count: repo.forks_count,
      html_url: repo.web_url
    }));
  }
};
