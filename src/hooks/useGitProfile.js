import { useState } from 'react';
import { getProvider } from '../api';
import { AnalysisService } from '../services/AnalysisService';
import { AIService } from '../services/AIService';

/**
 * Custom hook to handle the state and logic of fetching a Git profile.
 */
export const useGitProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [platform, setPlatform] = useState('github');

  const analyzeProfile = async (input) => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { provider, username } = getProvider(input);
      setPlatform(provider.name);

      const [user, repositories] = await Promise.all([
        provider.getUser(username),
        provider.getRepositories(username)
      ]);

      // 1. Initial analysis (Fast, using heuristics)
      const calculatedStats = AnalysisService.calculateStats(user, repositories);
      
      setUserData(user);
      setRepos(repositories);
      setStats(calculatedStats);

      // 2. AI Enrichment (Async, using Llama 3)
      // We don't await this to avoid blocking the UI
      AIService.getDeveloperInsights(user, calculatedStats, repositories)
        .then(aiInsights => {
          if (aiInsights) {
            setStats(prev => ({
              ...prev,
              insights: aiInsights // Replace heuristic insights with AI ones
            }));
          }
        });

    } catch (err) {
      console.error(err);
      setError(err.message === '404' ? 'Usuario no encontrado' : 'Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUserData(null);
    setStats(null);
    setRepos([]);
  };

  return {
    loading,
    userData,
    repos,
    stats,
    error,
    platform,
    analyzeProfile,
    reset
  };
};
