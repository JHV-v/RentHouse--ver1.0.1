import type { ScoreResult, RawScoreInput } from '../../lib/score'
import { generateRoast } from '../../lib/resultText'

interface AIRoastSectionProps {
  score: ScoreResult
  input: RawScoreInput
}

export default function AIRoastSection({ score, input }: AIRoastSectionProps) {
  const roast = generateRoast(score, input)

  return (
    <section className="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow">
      <div className="flex items-start gap-stack-md">
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary">smart_toy</span>
        </div>
        <div className="space-y-stack-sm flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">AI 辣评</span>
              <span className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">Premium Insight</span>
            </div>
          </div>
          <div className="mt-4 p-stack-lg bg-[#fafafa] rounded-2xl italic border-l-4 border-primary/20 text-body-md text-on-surface-variant leading-relaxed font-medium">
            &ldquo;{roast}&rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
