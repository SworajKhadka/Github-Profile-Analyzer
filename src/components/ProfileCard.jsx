import { useState, useEffect } from 'react';

function useCountUp(end, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!end) { setValue(0); return; }
    let rafId;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);
  return value;
}

function Stat({ label, value }) {
  const count = useCountUp(value ?? 0);
  return (
    <div className="px-6 first:pl-0 last:pr-0 text-center shrink-0">
      <div className="text-lg font-semibold text-[#e6edf3] font-geist" style={{ letterSpacing: '-0.3px' }}>
        {count.toLocaleString()}
      </div>
      <div className="text-[10px] text-[#6e7681] uppercase tracking-widest mt-0.5 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M9 21V9M15 21V9" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MetaItem({ icon, children }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
      <span className="text-[#6e7681] shrink-0">{icon}</span>
      {children}
    </span>
  );
}

export default function ProfileCard({ user, totalCommits }) {
  const memberSince = new Date(user.created_at).getFullYear();

  return (
    <div className="card p-6 fade-in">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <a href={user.html_url} target="_blank" rel="noreferrer" className="shrink-0 self-start">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full transition-transform duration-200 hover:scale-105"
            style={{ boxShadow: '0 0 0 2px #58a6ff, 0 0 0 5px #010409' }}
          />
        </a>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2
              className="text-2xl font-semibold text-[#e6edf3] font-geist leading-tight"
              style={{ letterSpacing: '-0.5px' }}
            >
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-[#58a6ff] hover:underline"
            >
              @{user.login}
            </a>
            <span className="text-[10px] font-mono text-[#8b949e] bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded-full">
              since {memberSince}
            </span>
          </div>

          {user.bio && (
            <p className="text-sm text-[#8b949e] mt-3 leading-relaxed max-w-xl">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3.5">
            {user.company && (
              <MetaItem icon={<BuildingIcon />}>
                {user.company.replace(/^@/, '')}
              </MetaItem>
            )}
            {user.location && (
              <MetaItem icon={<PinIcon />}>{user.location}</MetaItem>
            )}
            {user.twitter_username && (
              <MetaItem icon={<XIcon />}>
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#58a6ff] hover:underline"
                >
                  @{user.twitter_username}
                </a>
              </MetaItem>
            )}
            {user.blog && (
              <MetaItem icon={<LinkIcon />}>
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#58a6ff] hover:underline truncate max-w-[200px]"
                >
                  {user.blog.replace(/^https?:\/\//, '')}
                </a>
              </MetaItem>
            )}
          </div>
        </div>
      </div>

      {/* Stats with dividers */}
      <div className="flex items-center divide-x divide-[#21262d] mt-6 pt-5 border-t border-[#21262d] overflow-x-auto">
        <Stat label="Repositories" value={user.public_repos} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
        <Stat label="Gists" value={user.public_gists} />
        <Stat label="Commits" value={totalCommits ?? 0} />
      </div>
    </div>
  );
}
