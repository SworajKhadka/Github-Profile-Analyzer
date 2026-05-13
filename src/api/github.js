import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

export const fetchUser = (username) =>
  api.get(`/users/${username}`).then((r) => r.data);

export const fetchRepos = (username) =>
  api
    .get(`/users/${username}/repos`, { params: { per_page: 100, sort: 'pushed' } })
    .then((r) => r.data);

export const fetchLanguages = (fullName) =>
  api.get(`/repos/${fullName}/languages`).then((r) => r.data);

export const fetchRecentCommits = (fullName, username, since) =>
  api
    .get(`/repos/${fullName}/commits`, {
      params: { author: username, since, per_page: 100 },
    })
    .then((r) => r.data)
    .catch(() => []);

export const fetchTotalCommits = (username) =>
  api
    .get('/search/commits', {
      params: { q: `author:${username}`, per_page: 1 },
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    })
    .then((r) => r.data.total_count)
    .catch(() => null);
