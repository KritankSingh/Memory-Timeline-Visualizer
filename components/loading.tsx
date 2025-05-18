export function LoadingTimeline() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 dark:bg-slate-700"></div>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative mb-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className={`ml-8 ${i % 2 === 0 ? "mr-auto" : "ml-auto"} w-[80%] max-w-md`}>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3 w-1/4"></div>
              <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
