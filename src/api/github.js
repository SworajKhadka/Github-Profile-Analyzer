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

export const fetchEvents = (username) =>
  api
    .get(`/users/${username}/events`, { params: { per_page: 100 } })
    .then((r) => r.data);
