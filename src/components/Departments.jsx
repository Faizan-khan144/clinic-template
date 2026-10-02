import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { departments } from '../brand.js'
import { FadeUp, SectionHead } from './Reveal.jsx'
import { responsiveSrc } from './SmartImage.jsx'

const EASE = [0.16, 1, 0.3, 1]

export default function Departments() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const item = departments.items[active]

  return (
    <section id="departments" className="relative bg-mist px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={departments.kicker} title={departments.title} />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="border-t border-ink/10">
              {departments.items.map((d, i) => (
                <FadeUp key={d.title} delay={i * 0.06}>
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    className="group relative cursor-pointer border-b border-ink/10 py-7 outline-none transition-colors sm:py-9"
                  >
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-green transition-transform duration-500 ease-out ${
                        active === i ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />

                    <div className="flex items-start gap-5 sm:gap-7">
                      <span className="mt-1.5 text-[11px] font-bold text-fog tabular-nums transition-colors group-hover:text-leaf">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <h3
                            className={`text-[20px] font-bold tracking-[-0.02em] transition-colors sm:text-[26px] ${
                              active === i ? 'text-forest' : 'text-ink'
                            }`}
                          >
                            {d.title}
                          </h3>
                          <ArrowUpRight
                            size={19}
                            className={`shrink-0 transition-all duration-300 ${
                              active === i ? 'translate-x-0 text-green opacity-100' : '-translate-x-1 text-fog opacity-0'
                            }`}
                          />
                        </div>
                        <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-slate sm:text-[15px]">
                          {d.body}
                        </p>
                      </div>

                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-haze sm:hidden">
                        <img
                          src={d.image}
                          srcSet={responsiveSrc(d.image)}
                          sizes="80px"
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-haze">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={item.image}
                    src={item.image}
                    srcSet={responsiveSrc(item.image)}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: EASE }}
                    loading="lazy"
                  />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-7">
                  <motion.p
                    key={item.title + '-label'}
                    className="text-[13px] font-semibold tracking-[0.16em] text-white uppercase"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                  >
                    {item.title}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}