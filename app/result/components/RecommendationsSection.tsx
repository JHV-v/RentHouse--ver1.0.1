import type { ScoreResult } from '../../lib/score'
import { generateRecommendations } from '../../lib/resultText'

interface RecommendationsSectionProps {
  score: ScoreResult
}

export default function RecommendationsSection({ score }: RecommendationsSectionProps) {
  const recs = generateRecommendations(score)

  return (
    <section className="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow">
      <h3 className="font-headline-sm text-headline-sm mb-stack-md flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">verified_user</span>
        专家共识
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recs.map((rec) => (
          <div key={rec} className="flex items-center gap-stack-md p-stack-md bg-surface-container-low rounded-2xl">
            <span className="material-symbols-outlined text-emerald-600 fill-1">check_circle</span>
            <span className="font-body-md text-body-md text-on-surface font-medium">{rec}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
