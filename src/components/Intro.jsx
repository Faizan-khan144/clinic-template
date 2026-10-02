import { intro } from '../brand.js'
import { FadeUp, MaskLines, ParallaxImage } from './Reveal.jsx'

export default function Intro() {
  return (
    <section id="why" className="relative bg-paper px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <FadeUp>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-leaf" />
                <span className="text-[11px] font-semibold tracking-[0.22em] text-green uppercase">
                  {intro.kicker}
                </span>
              </div>
            </FadeUp>

            <MaskLines
              lines={intro.lines}
              className="block text-[clamp(1.9rem,5.2vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.035em] text-ink"
            />

            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-slate sm:text-base">{intro.body}</p>
            </FadeUp>

            <div className="mt-12 space-y-0 border-t border-ink/8">
              {intro.points.map((point, i) => (
                <FadeUp key={point.title} delay={0.1 + i * 0.08}>
                  <div className="group grid grid-cols-[auto_1fr] gap-5 border-b border-ink/8 py-6 sm:gap-8">
                    <span className="mt-1 text-[11px] font-bold text-leaf tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate">{point.body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <ParallaxImage
              src={intro.image}
              alt="Verdant Clinic reception area"
              className="h-[340px] w-full sm:h-[460px] lg:h-[620px] lg:rounded-[2rem]"
            />

            <FadeUp delay={0.15} className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-forest p-6 text-white">
                <p className="text-[32px] leading-none font-bold tracking-[-0.03em]">Same day</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                  Consultations confirmed before the day ends.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-mist p-6">
                <p className="text-[32px] leading-none font-bold tracking-[-0.03em] text-ink">On site</p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">
                  Laboratory, imaging, and pharmacy in one building.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}