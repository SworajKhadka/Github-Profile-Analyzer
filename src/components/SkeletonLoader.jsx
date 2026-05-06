function Pulse({ className = '' }) {
  return <div className={`animate-pulse bg-[#161b22] rounded-lg ${className}`} />;
}

export default function SkeletonLoader() {
  return (
    <div className="fade-in space-y-6">
      {/* Profile */}
      <div className="card p-6 flex flex-col sm:flex-row gap-6">
        <Pulse className="w-20 h-20 rounded-full shrink-0" />
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <Pulse className="h-7 w-48" />
            <Pulse className="h-5 w-24" />
            <Pulse className="h-5 w-20 rounded-full" />
          </div>
          <Pulse className="h-4 w-full max-w-sm" />
          <Pulse className="h-4 w-72" />
          <div className="flex divide-x divide-[#21262d] pt-4 border-t border-[#21262d] overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 first:pl-0 space-y-2 shrink-0">
                <Pulse className="h-6 w-14" />
                <Pulse className="h-2.5 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <Pulse className="h-3 w-36" />
            <Pulse className="h-3 w-20" />
          </div>
          <div className="flex gap-6 items-center">
            <Pulse className="w-36 h-36 rounded-full shrink-0" />
            <div className="flex-1 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <Pulse className="h-3 w-20" />
                    <Pulse className="h-3 w-10" />
                  </div>
                  <Pulse className="h-1 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <Pulse className="h-3 w-48" />
            <Pulse className="h-3 w-16" />
          </div>
          <Pulse className="h-44 w-full" />
        </div>
      </div>

      {/* Repos */}
      <div className="space-y-4">
        <Pulse className="h-3 w-36" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <Pulse className="h-5 w-40" />
              <Pulse className="h-3.5 w-full" />
              <Pulse className="h-3.5 w-4/5" />
              <div className="flex gap-3 pt-1">
                <Pulse className="h-3 w-16" />
                <Pulse className="h-3 w-10" />
                <Pulse className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
