import { heroTitle, heroSubtitle, heroBody } from '../../lib/resultText'

interface HeroSectionProps {
  totalScore: number
  persona: string
}

export default function HeroSection({ totalScore, persona }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white border border-outline-variant/30 p-stack-lg text-on-surface soft-shadow diffusion-bg">
      <div className="flex flex-col md:flex-row items-center gap-stack-lg relative z-10">
        <div className="bg-primary/5 rounded-3xl p-stack-md flex flex-col items-center justify-center min-w-[140px] aspect-square">
          <span className="font-display-lg text-display-lg text-primary tracking-tighter">{totalScore}</span>
          <span className="font-label-md text-label-md font-bold text-primary/60 tracking-widest">{persona}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-headline-lg text-headline-lg text-on-surface flex items-center justify-center md:justify-start gap-2">
            {heroTitle(persona)}
          </h1>
          <p className="font-headline-sm text-headline-sm mt-1 text-on-surface/70 font-medium">{heroSubtitle(persona)}</p>
          <p className="font-body-md text-body-md mt-stack-md leading-relaxed text-on-surface-variant">{heroBody(persona)}</p>
        </div>
      </div>
    </section>
  )
}
