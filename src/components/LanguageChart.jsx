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

export default function LanguageChart({ languages }) {
  if (!languages.length) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-[#8b949e] text-sm">No language data available</p>
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
        borderColor: '#161b22',
        borderWidth: 3,
        hoverBorderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = ((ctx.raw / total) * 100).toFixed(1);
            return `  ${ctx.label}: ${pct}%`;
          },
        },
        backgroundColor: '#0d1117',
        borderColor: '#30363d',
        borderWidth: 1,
        titleColor: '#c9d1d9',
        bodyColor: '#8b949e',
        padding: 10,
      },
    },
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
      <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest mb-5 font-space">
        Language Breakdown
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40 shrink-0">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="flex flex-col gap-2.5 w-full min-w-0">
          {languages.map(([lang, bytes], i) => {
            const pct = ((bytes / total) * 100).toFixed(1);
            return (
              <div key={lang} className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: getLangColor(lang, i) }}
                />
                <span className="text-sm text-[#c9d1d9] flex-1 truncate">{lang}</span>
                <span className="text-xs text-[#8b949e] font-space shrink-0">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
