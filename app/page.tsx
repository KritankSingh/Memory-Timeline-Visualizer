import { Suspense } from "react"
import Timeline from "@/components/timeline"
import { LoadingTimeline } from "@/components/loading"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Memory Timeline</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your personal journey visualized with AI-enhanced memories
          </p>
        </header>

        <Suspense fallback={<LoadingTimeline />}>
          <Timeline />
        </Suspense>
      </div>
    </main>
  )
}
