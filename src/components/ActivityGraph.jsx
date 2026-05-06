import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function ActivityGraph({ activity }) {
  if (!activity.length) {
    return (
      <div className="card p-6 flex items-center justify-center min-h-[220px]">
        <p className="text-[#6e7681] text-sm">No recent activity</p>
      </div>
    );
  }

  const labels = activity.map(([date]) => {
    const d = new Date(date + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const values = activity.map(([, count]) => count);
  const maxVal = Math.max(...values, 1);
  const totalCommits = values.reduce((a, b) => a + b, 0);
  const isAllZero = values.every((v) => v === 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: values.map((v) =>
          v === 0
            ? '#21262d'
            : `rgba(88, 166, 255, ${(0.2 + 0.8 * (v / maxVal)).toFixed(2)})`
        ),
        borderRadius: 4,
        borderSkipped: false,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => activity[items[0].dataIndex][0],
          label: (ctx) => `  ${ctx.raw} commit${ctx.raw !== 1 ? 's' : ''}`,
        },
        backgroundColor: '#010409',
        borderColor: '#21262d',
        borderWidth: 1,
        titleColor: '#8b949e',
        bodyColor: '#c9d1d9',
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6e7681',
          font: { size: 10, family: "'Geist Mono', monospace" },
          maxRotation: 0,
          autoSkip: false,
          callback: (_, i) => (i % 5 === 0 ? labels[i] : ''),
        },
        grid: { display: false },
        border: { color: '#21262d' },
      },
      y: {
        ticks: {
          color: '#6e7681',
          font: { size: 10 },
          precision: 0,
          maxTicksLimit: 4,
        },
        grid: { color: 'rgba(33, 38, 45, 0.9)' },
        border: { color: '#21262d', dash: [4, 4] },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest font-mono">
          Commit Activity · Last 30 Days
        </h3>
        <span className="text-xs text-[#58a6ff] font-mono">{totalCommits} commits</span>
      </div>

      <div className="h-44 relative">
        <div className={isAllZero ? 'opacity-[0.15]' : ''} style={{ height: '100%' }}>
          <Bar data={chartData} options={options} />
        </div>
        {isAllZero && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#484f58"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-[#6e7681] text-xs">No public activity in the last 30 days</p>
          </div>
        )}
      </div>
    </div>
  );
}
