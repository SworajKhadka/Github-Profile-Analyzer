import { useGithub } from './hooks/useGithub';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LanguageChart from './components/LanguageChart';
import RepoList from './components/RepoList';
import ActivityGraph from './components/ActivityGraph';
import SkeletonLoader from './components/SkeletonLoader';

const SUGGESTIONS = ['torvalds', 'gaearon', 'sindresorhus'];

function GithubLogo() {
  return (
    <svg viewBox="0 0 16 16" className="w-7 h-7 text-[#58a6ff]" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function SearchIllustration() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#30363d"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M8 11h6M11 8v6" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function WarningIllustration() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f85149"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function App() {
  const { user, repos, languages, activity, totalCommits, loading, error, search } = useGithub();
  const hasData = user && !loading;

  return (
    <div className="min-h-screen bg-[#010409] flex flex-col">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="text-center pt-14 pb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <GithubLogo />
            <h1
              className="font-geist font-bold text-[#e6edf3] leading-none"
              style={{ fontSize: 'clamp(38px, 7vw, 64px)', letterSpacing: '-2px' }}
            >
              GitHub <span className="glow-underline">Analyzer</span>
            </h1>
          </div>
          <p className="text-[#6e7681] text-sm tracking-wide">
            Explore any GitHub profile — languages, activity, and top repos.
          </p>
        </header>

        {/* ── Search bar ─────────────────────────────────────── */}
        <SearchBar onSearch={search} loading={loading} />

        {/* ── Content ────────────────────────────────────────── */}
        <div className="mt-8 space-y-6 flex-1">

          {/* Loading skeleton */}
          {loading && <SkeletonLoader />}

          {/* Error state */}
          {error && !loading && (
            <div className="fade-in text-center py-20">
              <div className="flex justify-center mb-4">
                <WarningIllustration />
              </div>
              <p className="text-[#f85149] font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Data state */}
          {hasData && (
            <div className="space-y-6 pb-10">
              <ProfileCard user={user} totalCommits={totalCommits} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
                <LanguageChart languages={languages} />
                <ActivityGraph activity={activity} />
              </div>
              <div className="fade-in">
                <RepoList repos={repos} />
              </div>
            </div>
          )}

          {/* Empty / landing state */}
          {!loading && !error && !user && (
            <div className="relative overflow-hidden rounded-2xl">
              {/* CSS grid background */}
              <div className="absolute inset-0 grid-bg" />
              {/* Radial gradient to fade grid at edges */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 100%, transparent 10%, #010409 75%)',
                }}
              />

              {/* Landing content */}
              <div className="relative text-center py-24 px-4">
                <div className="flex justify-center mb-8 opacity-60">
                  <SearchIllustration />
                </div>

                <p className="text-[#8b949e] text-sm mb-6">
                  Search a username to view their GitHub profile
                </p>

                {/* Keyboard-key suggestion chips */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-xs text-[#6e7681]">Try</span>
                  {SUGGESTIONS.map((name) => (
                    <button
                      key={name}
                      onClick={() => search(name)}
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        boxShadow: '0 1px 0 0 #30363d, inset 0 -1px 0 0 #30363d',
                      }}
                      className="text-xs text-[#8b949e] bg-[#0d1117] border border-[#30363d] rounded px-3 py-1.5 hover:border-[#58a6ff] hover:text-[#58a6ff] transition-colors duration-150 cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#484f58] mt-5 tracking-wide">
                  ↓ type any username above
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-[#21262d] mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6e7681]">
            Built with{' '}
            <span className="text-[#c9d1d9]">React</span>
            {' + '}
            <span className="text-[#c9d1d9]">GitHub API</span>
          </p>
          <p className="text-xs text-[#6e7681]">
            Made by{' '}
            <a
              href="https://github.com/sworajkhadka"
              target="_blank"
              rel="noreferrer"
              className="text-[#58a6ff] hover:underline font-mono"
            >
              sworajkhadka
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
