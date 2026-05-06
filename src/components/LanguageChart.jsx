import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

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
  Scala: '#c22d40',
  R: '#198CE7',
  Lua: '#000080',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Clojure: '#db5855',
  'Objective-C': '#438eff',
};

const FALLBACK = ['#58a6ff', '#bc8cff', '#ff7b72', '#ffa657', '#3fb950', '#d2a8ff'];

function getLangColor(lang, index) {
  return LANG_COLORS[lang] ?? FALLBACK[index % FALLBACK.length];
}

function formatBytes(bytes) {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function LanguageChart({ languages }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, [languages]);

  if (!languages.length) {
    return (
      <div className="card p-6 flex items-center justify-center min-h-[220px]">
        <p className="text-[#6e7681] text-sm">No language data available</p>
      </div>
    );
  }

  const total = languages.reduce((sum, [, bytes]) => sum + bytes, 0);
  const colors = languages.map(([lang], i) => getLangColor(lang, i));

  const chartData = {
    labels: languages.map(([lang]) => lang),
    datasets: [
      {
        data: languages.map(([, bytes]) => bytes),
        backgroundColor: colors,
        borderColor: '#0d1117',
        borderWidth: 3,
        hoverBorderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = ((ctx.raw / total) * 100).toFixed(1);
            return `  ${ctx.label}: ${pct}%`;
          },
        },
        backgroundColor: '#010409',
        borderColor: '#21262d',
        borderWidth: 1,
        titleColor: '#c9d1d9',
        bodyColor: '#8b949e',
        padding: 10,
      },
    },
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest font-mono">
          Language Breakdown
        </h3>
        <span className="text-xs text-[#58a6ff] font-mono">{formatBytes(total)}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut */}
        <div className="w-36 h-36 shrink-0">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Language bars */}
        <div className="flex flex-col gap-3.5 w-full min-w-0">
          {languages.map(([lang, bytes], i) => {
            const pct = ((bytes / total) * 100).toFixed(1);
            const color = getLangColor(lang, i);
            return (
              <div key={lang} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-[#c9d1d9] truncate">{lang}</span>
                  </div>
                  <span className="text-[11px] text-[#6e7681] font-mono shrink-0">{pct}%</span>
                </div>
                <div className="h-[3px] bg-[#21262d] rounded-full overflow-hidden">
                  <div
                    style={{
                      width: mounted ? `${pct}%` : '0%',
                      backgroundColor: color,
                      transition: `width 700ms cubic-bezier(0.25, 1, 0.5, 1) ${i * 80}ms`,
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
