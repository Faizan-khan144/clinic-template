import { clinic } from '../brand.js'
import { FadeUp, MaskLines, ParallaxImage } from './Reveal.jsx'

export default function Clinic() {
  return (
    <section id="clinic" className="relative bg-mist px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <ParallaxImage
              src={clinic.image}
              alt="Verdant Clinic exterior"
              className="h-[320px] w-full rounded-[1.75rem] sm:h-[440px] lg:h-[560px]"
            />
            <FadeUp delay={0.12} className="mt-5 grid grid-cols-2 gap-5">
              <ParallaxImage
                src={clinic.secondaryImage}
                alt="Clinic equipment"
                className="h-[160px] w-full rounded-2xl sm:h-[210px]"
                strength={20}
              />
              <div className="flex flex-col justify-center rounded-2xl bg-white p-6">
                {clinic.facts.slice(0, 2).map((f) => (
                  <div key={f.label} className="border-b border-ink/8 py-2.5 last:border-0">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">{f.label}</p>
                    <p className="mt-1 text-[15px] font-semibold text-ink">{f.value}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <FadeUp>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-leaf" />
                <span className="text-[11px] font-semibold tracking-[0.22em] text-green uppercase">
                  {clinic.kicker}
                </span>
              </div>
            </FadeUp>

            <MaskLines
              lines={['Built to feel calm,', 'not clinical.']}
              className="block text-[clamp(1.9rem,5.2vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.035em] text-ink"
            />

            <FadeUp delay={0.2}>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-slate sm:text-base">{clinic.body}</p>
            </FadeUp>

            <div className="mt-11 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink/10 pt-9">
              {clinic.facts.map((f, i) => (
                <FadeUp key={f.label} delay={0.08 + i * 0.06}>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">{f.label}</p>
                    <p className="mt-1.5 text-[16px] font-semibold tracking-[-0.01em] text-ink sm:text-[18px]">
                      {f.value}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}