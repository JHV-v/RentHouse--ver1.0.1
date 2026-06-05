import type { ScoreResult, RawScoreInput } from '../../lib/score'
import { clampPct, stressTier, beatPercentile, generateSummary } from '../../lib/resultText'
import ScoreBar from './ScoreBar'

interface EvaluationSectionProps {
  score: ScoreResult
  input: RawScoreInput
}

export default function EvaluationSection({ score, input }: EvaluationSectionProps) {
  const summary = generateSummary(score, input)

  return (
    <section className="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow space-y-stack-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">多维度深度测评</h2>
        <div className="bg-primary/5 rounded-full px-5 py-2.5 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px] fill-1">stars</span>
          <span className="font-label-md text-label-md text-primary font-semibold">
            你已经击败了 {beatPercentile(score.totalScore)}% 的租房打工人
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <div className="space-y-stack-md">
          <ScoreBar icon="payments" iconColor="text-tertiary-container/70" label="房租占收入" value={clampPct(score.rentRatio)} barFrom="from-tertiary-container/40" barTo="to-tertiary-container" />
          <ScoreBar icon="commute" iconColor="text-primary/70" label="通勤效率" value={score.commuteScore} barFrom="from-primary/40" barTo="to-primary" />
          <ScoreBar icon="king_bed" iconColor="text-emerald-600/70" label="居住舒适度" value={score.liveScore} barFrom="from-emerald-500/40" barTo="to-emerald-500" />
        </div>
        <div className="space-y-stack-md">
          <ScoreBar icon="restaurant" iconColor="text-orange-500/70" label="生活便利度" value={score.lifeScore} barFrom="from-orange-500/40" barTo="to-orange-500" />
          <ScoreBar icon="self_improvement" iconColor="text-purple-600/70" label="压力指数" value={score.stress} barFrom="from-purple-500/40" barTo="to-purple-500" displayText={`${stressTier(score.stress)} (${score.stress}%)`} />
          <div className="p-stack-md bg-surface-container-lowest border border-outline-variant/30 rounded-2xl flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-primary/40 text-[28px] fill-1">verified</span>
            <div className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">{summary}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
