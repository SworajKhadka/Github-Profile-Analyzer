import { useGithub } from './hooks/useGithub';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LanguageChart from './components/LanguageChart';
import RepoList from './components/RepoList';
import ActivityGraph from './components/ActivityGraph';
import SkeletonLoader from './components/SkeletonLoader';

export default function App() {
  const { user, repos, languages, activity, loading, error, search } =
    useGithub();

  const hasData = user && !loading;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-20">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg
              viewBox="0 0 16 16"
              className="w-8 h-8 text-[#58a6ff]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] font-space tracking-tight">
              GitHub Analyzer
            </h1>
          </div>
          <p className="text-[#8b949e] text-sm">
            Explore any GitHub profile — languages, activity, and top repos at a
            glance.
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={search} loading={loading} />

        {/* Content */}
        <div className="mt-8 space-y-6">
          {loading && <SkeletonLoader />}

          {error && !loading && (
            <div className="fade-in text-center py-16">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-[#f85149] font-medium">{error}</p>
            </div>
          )}

          {hasData && (
            <div className="space-y-6">
              <ProfileCard user={user} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
                <LanguageChart languages={languages} />
                <ActivityGraph activity={activity} />
              </div>
              <div className="fade-in">
                <RepoList repos={repos} />
              </div>
            </div>
          )}

          {!loading && !error && !user && (
            <div className="text-center py-24 text-[#8b949e]">
              <div className="text-6xl mb-5 select-none">🔍</div>
              <p className="text-base">
                Search a username to view their GitHub profile
              </p>
              <p className="text-sm mt-2 text-[#6e7681]">
                Try{' '}
                {['torvalds', 'gaearon', 'sindresorhus'].map((name, i, arr) => (
                  <span key={name}>
                    <button
                      onClick={() => search(name)}
                      className="text-[#58a6ff] hover:underline cursor-pointer bg-transparent border-none p-0"
                      style={{ font: 'inherit' }}
                    >
                      {name}
                    </button>
                    {i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
