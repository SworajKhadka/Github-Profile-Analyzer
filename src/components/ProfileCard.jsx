function Stat({ label, value }) {
  return (
    <div className="text-center min-w-[60px]">
      <div className="text-lg font-bold text-[#e6edf3] font-space">
        {(value ?? 0).toLocaleString()}
      </div>
      <div className="text-[10px] text-[#8b949e] uppercase tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
}

function MetaItem({ icon, children }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-[#8b949e]">
      <span className="text-[#6e7681]">{icon}</span>
      {children}
    </span>
  );
}

export default function ProfileCard({ user }) {
  const memberSince = new Date(user.created_at).getFullYear();

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 fade-in">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <a href={user.html_url} target="_blank" rel="noreferrer" className="shrink-0 self-start">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full border-2 border-[#30363d] hover:border-[#58a6ff] transition-colors"
          />
        </a>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-bold text-[#e6edf3] font-space">
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-[#58a6ff] text-sm hover:underline"
            >
              @{user.login}
            </a>
            <span className="text-xs text-[#6e7681]">since {memberSince}</span>
          </div>

          {user.bio && (
            <p className="text-sm text-[#8b949e] mt-2 leading-relaxed max-w-xl">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
            {user.company && (
              <MetaItem icon="🏢">{user.company.replace(/^@/, '')}</MetaItem>
            )}
            {user.location && <MetaItem icon="📍">{user.location}</MetaItem>}
            {user.twitter_username && (
              <MetaItem icon="𝕏">
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
              <MetaItem icon="🔗">
                <a
                  href={
                    user.blog.startsWith('http')
                      ? user.blog
                      : `https://${user.blog}`
                  }
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

      {/* Stats */}
      <div className="flex flex-wrap gap-8 mt-6 pt-5 border-t border-[#30363d]">
        <Stat label="Repositories" value={user.public_repos} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
        <Stat label="Gists" value={user.public_gists} />
      </div>
    </div>
  );
}
