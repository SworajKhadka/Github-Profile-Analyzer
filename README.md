# GitHub Profile Analyzer

A clean, fast web app for exploring any GitHub profile at a glance — commit activity, top repositories, language breakdown, and key stats, all in one view.

**Live Demo →** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## Features

- **Profile Overview** — Avatar, bio, location, company, links, and member since year
- **Stats Bar** — Public repos, followers, following, gists, and total public commits
- **Commit Activity Graph** — 30-day bar chart of commit frequency across recently active repos
- **Language Breakdown** — Aggregated language usage across top repos, visualized as a donut chart
- **Top Repositories** — Up to 10 most-starred repos with stars, forks, and language tags
- **Skeleton loading states** and smooth count-up animations on stats
- Works on any public GitHub username

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Charts | Chart.js + react-chartjs-2 |
| HTTP | Axios |
| API | GitHub REST API v3 |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub Personal Access Token (for higher API rate limits)

### Installation

```bash
# Clone the repo
git clone https://github.com/sworajkhadka/github-analyzer.git
cd github-analyzer

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

To generate a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token. No special scopes are needed — public data access is sufficient.

> Without a token the app still works, but GitHub's unauthenticated rate limit is 60 requests/hour. With a token it's 5,000/hour.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── api/
│   └── github.js          # All GitHub API calls (user, repos, languages, commits)
├── components/
│   ├── ActivityGraph.jsx   # 30-day commit bar chart
│   ├── LanguageChart.jsx   # Language donut chart
│   ├── ProfileCard.jsx     # User info + stats
│   ├── RepoList.jsx        # Top repositories list
│   ├── SearchBar.jsx       # Username search input
│   └── SkeletonLoader.jsx  # Loading placeholder UI
├── hooks/
│   └── useGithub.js        # Data fetching logic and state management
├── App.jsx
└── main.jsx
```

---

## Deployment

The project is deployed on Vercel. To deploy your own:

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add `VITE_GITHUB_TOKEN` under **Settings → Environment Variables**
4. Deploy — any push to `main` will trigger an automatic redeploy

---

## GitHub API Usage

This project uses three GitHub REST API endpoints:

- `GET /users/{username}` — profile data
- `GET /users/{username}/repos` — repository list
- `GET /repos/{owner}/{repo}/commits` — commit history per repo (for activity graph)
- `GET /search/commits?q=author:{username}` — total public commit count

---

## Author

Built by [@sworajkhadka](https://github.com/sworajkhadka)
