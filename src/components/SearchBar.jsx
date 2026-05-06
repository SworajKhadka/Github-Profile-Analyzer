import { useState } from 'react';

function SpinnerIcon() {
  return (
    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[600px] mx-auto w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter a GitHub username…"
        disabled={loading}
        style={{
          height: '52px',
          borderColor: focused ? '#58a6ff' : '#30363d',
          boxShadow: focused ? '0 0 0 3px rgba(88, 166, 255, 0.13)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
        className="flex-1 bg-[#0d1117] border rounded-lg px-4 text-[#e6edf3] placeholder-[#6e7681] text-sm focus:outline-none disabled:opacity-40"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        style={{ height: '52px' }}
        className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] text-sm font-medium px-5 rounded-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0 whitespace-nowrap"
      >
        {loading ? (
          <>
            <SpinnerIcon />
            <span>Fetching…</span>
          </>
        ) : (
          <>
            <span>Analyze</span>
            <kbd className="hidden sm:inline-flex items-center justify-center text-[10px] text-[#6e7681] border border-[#484f58] rounded px-1.5 py-0.5 font-mono leading-none">
              ↵
            </kbd>
          </>
        )}
      </button>
    </form>
  );
}
