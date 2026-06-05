import type { ScoreResult, RawScoreInput } from '../../lib/score'
import { generatePros, generateCons } from '../../lib/resultText'

interface ProsConsSectionProps {
  score: ScoreResult
  input: RawScoreInput
}

export default function ProsConsSection({ score, input }: ProsConsSectionProps) {
  const pros = generatePros(score, input)
  const cons = generateCons(score, input)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <div className="bg-white border border-outline-variant/30 rounded-3xl p-stack-lg soft-shadow">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 fill-1">recommend</span>
          居住优势
        </h3>
        <div className="flex flex-wrap gap-2">
          {pros.map((tag) => (
            <span key={tag} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-body-sm font-semibold">{tag}</span>
          ))}
        </div>
      </div>
      <div className="bg-white border border-outline-variant/30 rounded-3xl p-stack-lg soft-shadow">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-600">sentiment_satisfied</span>
          微小的烦恼
        </h3>
        <div className="flex flex-wrap gap-2">
          {cons.map((tag) => (
            <span key={tag} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-body-sm font-semibold">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
