function Pulse({ className = '' }) {
  return <div className={`animate-pulse bg-[#21262d] rounded-lg ${className}`} />;
}

export default function SkeletonLoader() {
  return (
    <div className="fade-in space-y-6">
      {/* Profile */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex flex-col sm:flex-row gap-6">
        <Pulse className="w-24 h-24 rounded-full shrink-0" />
        <div className="flex-1 space-y-3">
          <Pulse className="h-7 w-48" />
          <Pulse className="h-4 w-28" />
          <Pulse className="h-4 w-full max-w-sm" />
          <Pulse className="h-4 w-64" />
          <div className="flex gap-6 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <Pulse className="h-6 w-14" />
                <Pulse className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4">
          <Pulse className="h-4 w-36" />
          <div className="flex gap-6 items-center">
            <Pulse className="w-40 h-40 rounded-full shrink-0" />
            <div className="flex-1 space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Pulse className="w-3 h-3 rounded-full shrink-0" />
                  <Pulse className="h-3 flex-1" />
                  <Pulse className="h-3 w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4">
          <Pulse className="h-4 w-48" />
          <Pulse className="h-48 w-full" />
        </div>
      </div>

      {/* Repos */}
      <div className="space-y-4">
        <Pulse className="h-4 w-36" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-3"
            >
              <Pulse className="h-5 w-44" />
              <Pulse className="h-3.5 w-full" />
              <Pulse className="h-3.5 w-4/5" />
              <div className="flex gap-4 pt-1">
                <Pulse className="h-3.5 w-16" />
                <Pulse className="h-3.5 w-12" />
                <Pulse className="h-3.5 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
