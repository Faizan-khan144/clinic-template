import { stats } from '../brand.js'
import { Counter, FadeUp } from './Reveal.jsx'

export default function Stats() {
  return (
    <section className="relative bg-forest px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div className="border-l border-white/18 pl-5 lg:pl-6">
                <p className="text-[clamp(2.1rem,6vw,3.4rem)] leading-none font-bold tracking-[-0.04em]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[12.5px] leading-snug text-white/65 sm:text-[13.5px]">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}