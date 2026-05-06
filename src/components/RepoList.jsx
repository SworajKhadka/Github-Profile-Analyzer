const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

function LanguageDot({ language }) {
  if (!language) return null;
  const color = LANG_COLORS[language] ?? '#8b949e';
  return (
    <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {language}
    </span>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
    </svg>
  );
}

function RepoCard({ repo }) {
  const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col gap-3 hover:border-[#58a6ff] transition-colors duration-150 group"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-[#58a6ff] text-sm group-hover:underline truncate leading-snug">
          {repo.name}
        </span>
        {repo.fork && (
          <span className="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded-full shrink-0">
            Fork
          </span>
        )}
      </div>

      {repo.description ? (
        <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 flex-1">
          {repo.description}
        </p>
      ) : (
        <p className="text-xs text-[#6e7681] italic flex-1">No description</p>
      )}

      <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mt-auto">
        <LanguageDot language={repo.language} />
        <span className="flex items-center gap-1 text-xs text-[#8b949e]">
          <StarIcon />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 text-xs text-[#8b949e]">
          <ForkIcon />
          {repo.forks_count.toLocaleString()}
        </span>
        <span className="text-[10px] text-[#6e7681] ml-auto">{updatedAt}</span>
      </div>
    </a>
  );
}

export default function RepoList({ repos }) {
  if (!repos.length) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest mb-4 font-space">
        Top Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
