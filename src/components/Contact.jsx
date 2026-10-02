import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Clock, MapPin, Phone } from 'lucide-react'
import { brand, contact } from '../brand.js'
import { FadeUp, MaskLines } from './Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

const reasons = [
  'General consultation',
  'Dental visit',
  'Diagnostics or lab work',
  'Physiotherapy',
  'Skin concern',
  'Something else',
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const reduce = useReducedMotion()

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const field =
    'w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-fog focus:border-green'

  return (
    <section id="contact" className="relative bg-paper px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-leaf" />
                <span className="text-[11px] font-semibold tracking-[0.22em] text-green uppercase">
                  {contact.kicker}
                </span>
              </div>
            </FadeUp>

            <MaskLines
              lines={['See a doctor', 'today.']}
              className="block text-[clamp(2rem,6.5vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.035em] text-ink"
            />

            <FadeUp delay={0.2}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-slate">{contact.body}</p>
            </FadeUp>

            <FadeUp delay={0.3} className="mt-10 space-y-3">
              <a
                href={`tel:${brand.phone.replace(/\s/g, '')}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-forest p-5 text-white transition-colors hover:bg-ink"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/12">
                    <Phone size={17} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                      Call the clinic
                    </span>
                    <span className="mt-0.5 block text-[17px] font-semibold tracking-[-0.01em]">
                      {brand.phone}
                    </span>
                  </span>
                </span>
                <ArrowUpRight size={19} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href={brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-ink/10 p-5 transition-colors hover:bg-mist"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist">
                  <MapPin size={17} className="text-green" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">
                    Address
                  </span>
                  <span className="mt-0.5 block text-[14.5px] font-semibold text-ink">{brand.address}</span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-fog transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <div className="rounded-2xl border border-ink/10 p-5">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist">
                    <Clock size={17} className="text-green" />
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">
                    Opening hours
                  </span>
                </div>
                <dl className="mt-4 space-y-2 border-t border-ink/8 pt-4">
                  {brand.hours.map((h) => (
                    <div key={h.days} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[13.5px] text-slate">{h.days}</dt>
                      <dd className="text-[13.5px] font-semibold text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <div className="rounded-[1.75rem] border border-ink/10 bg-mist p-6 sm:p-9">
                {sent ? (
                  <motion.div
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-green text-white">
                      <Check size={26} strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-6 text-[22px] font-bold tracking-[-0.02em] text-ink">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate">
                      Thank you. The clinic will call you on the number you gave us, usually within the hour
                      during opening times.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 text-[13.5px] font-semibold text-green underline underline-offset-4"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-graphite uppercase">
                          Full name
                        </span>
                        <input required name="name" type="text" placeholder="Your name" className={field} />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-graphite uppercase">
                          Phone number
                        </span>
                        <input required name="phone" type="tel" placeholder="+92 3XX XXXXXXX" className={field} />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-graphite uppercase">
                        What do you need
                      </span>
                      <select required name="reason" defaultValue="" className={`${field} appearance-none`}>
                        <option value="" disabled>
                          Choose a department
                        </option>
                        {reasons.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-graphite uppercase">
                        Brief note
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="A short description of the problem, and when you would like to come in."
                        className={`${field} resize-none`}
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green py-4 text-[15px] font-semibold text-white transition-colors hover:bg-forest"
                    >
                      Request an appointment
                    </button>

                    <p className="text-center text-[12.5px] text-fog">
                      Or call {brand.phone} directly. Emergencies are handled at any hour.
                    </p>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}