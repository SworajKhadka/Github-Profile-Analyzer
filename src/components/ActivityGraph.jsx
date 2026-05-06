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
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-[#8b949e] text-sm">No recent activity</p>
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

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: values.map((v) =>
          v === 0
            ? '#21262d'
            : `rgba(88, 166, 255, ${(0.25 + 0.75 * (v / maxVal)).toFixed(2)})`
        ),
        borderRadius: 3,
        borderSkipped: false,
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
          label: (ctx) =>
            `  ${ctx.raw} commit${ctx.raw !== 1 ? 's' : ''}`,
        },
        backgroundColor: '#0d1117',
        borderColor: '#30363d',
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
          font: { size: 10 },
          maxRotation: 0,
          autoSkip: false,
          callback: (_, i) => (i % 5 === 0 ? labels[i] : ''),
        },
        grid: { display: false },
        border: { color: '#30363d' },
      },
      y: {
        ticks: {
          color: '#6e7681',
          font: { size: 10 },
          precision: 0,
          maxTicksLimit: 5,
        },
        grid: { color: '#21262d' },
        border: { color: '#30363d', dash: [4, 4] },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest font-space">
          Commit Activity · Last 30 Days
        </h3>
        <span className="text-xs text-[#58a6ff] font-space">
          {totalCommits} total
        </span>
      </div>
      <div className="h-44">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
