import { useState, useCallback } from 'react';
import { fetchUser, fetchRepos, fetchLanguages, fetchEvents } from '../api/github';

function aggregateLanguages(langMaps) {
  const totals = {};
  for (const map of langMaps) {
    for (const [lang, bytes] of Object.entries(map)) {
      totals[lang] = (totals[lang] || 0) + bytes;
    }
  }
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

function buildActivityData(events) {
  const now = new Date();
  const days = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days[d.toISOString().split('T')[0]] = 0;
  }
  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue;
    const day = ev.created_at.split('T')[0];
    if (day in days) days[day] += ev.payload.commits?.length ?? 0;
  }
  return Object.entries(days);
}

export function useGithub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (username) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setLanguages([]);
    setActivity([]);

    try {
      const [userData, allRepos, events] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
        fetchEvents(username),
      ]);

      const byStars = [...allRepos].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      const topRepos = byStars.slice(0, 10);
      const reposForLang = byStars.slice(0, 20);

      const langMaps = await Promise.all(
        reposForLang.map((r) => fetchLanguages(r.full_name).catch(() => ({})))
      );

      setUser(userData);
      setRepos(topRepos);
      setLanguages(aggregateLanguages(langMaps));
      setActivity(buildActivityData(events));
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) setError('User not found. Check the username and try again.');
      else if (status === 403)
        setError('API rate limit exceeded. Please try again in a moment.');
      else setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, repos, languages, activity, loading, error, search };
}
