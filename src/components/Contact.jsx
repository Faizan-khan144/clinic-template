import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Clock, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { brand, contact, departments } from '../brand.js'
import { clinicNow, mapsLink, whatsappLink } from '../lib/clinic.js'
import { FadeUp, MaskLines } from './Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

const slots = ['As soon as possible', 'Today, this morning', 'Today, this afternoon', 'Tomorrow', 'Later this week']

const empty = { name: '', phone: '', department: '', message: '', slot: slots[0], consent: false }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [tick, setTick] = useState(0)
  const reduce = useReducedMotion()

  const status = useMemo(() => clinicNow(), [tick])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) next.phone = 'Enter a valid phone number so we can confirm.'
    if (!form.department) next.department = 'Choose the department you need.'
    if (form.message.trim().length < 10) next.message = 'A short note helps us prepare for your visit.'
    if (!form.consent) next.consent = 'Please allow us to contact you about this request.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setSent(true)
  }

  const waHref = whatsappLink(
    `Hello Verdant Clinic, I would like to book a ${form.department || 'consultation'}. My name is ${form.name || ''} and my number is ${form.phone || ''}.`,
  )

  const field =
    'w-full rounded-xl border bg-white px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-fog focus:border-forest'
  const label = 'mb-2 block text-[12px] font-semibold tracking-[0.12em] text-graphite uppercase'
  const err = 'mt-1.5 block text-[12.5px] font-medium text-red-600'

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

            <FadeUp delay={0.25}>
              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-mist px-4 py-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  {status.open && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status.open ? 'bg-green' : 'bg-fog'}`}
                  />
                </span>
                <span className="text-[13px] font-semibold text-ink">{status.label}</span>
                <span className="text-[13px] text-slate">{status.detail}</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.3} className="mt-8 space-y-3">
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
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 p-5 transition-colors hover:bg-mist"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist">
                    <MessageCircle size={17} className="text-green" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-[15px] font-semibold text-ink">
                      Message us and get a slot
                    </span>
                  </span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-fog transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href={mapsLink}
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
                  {brand.schedule.map((s) => (
                    <div
                      key={s.days}
                      className={`flex items-baseline justify-between gap-4 ${status.today?.days === s.days ? 'text-ink' : ''}`}
                    >
                      <dt className="flex items-center gap-2 text-[13.5px] text-slate">
                        {s.days}
                        {status.today?.days === s.days && (
                          <span className="rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-green uppercase">
                            Today
                          </span>
                        )}
                      </dt>
                      <dd className="text-[13.5px] font-semibold text-ink">{s.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-ink/8 pt-4 text-[13px] leading-relaxed text-slate">
                  {brand.emergencyNote}
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <div className="rounded-[1.75rem] border border-ink/10 bg-mist p-6 sm:p-9">
                {sent ? (
                  <motion.div
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                    initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    aria-live="polite"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-green text-white">
                      <Check size={26} strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-6 text-[22px] font-bold tracking-[-0.02em] text-ink">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate">
                      Thank you, {form.name.split(' ')[0]}. The clinic will call you on {form.phone} to confirm
                      your {form.department.toLowerCase()} slot, usually within the hour during opening times.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-ink"
                      >
                        <MessageCircle size={15} />
                        Confirm on WhatsApp
                      </a>
                      <a
                        href={`tel:${brand.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-5 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-white"
                      >
                        <Phone size={15} />
                        Call instead
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        setSent(false)
                        setForm(empty)
                      }}
                      className="mt-8 text-[13.5px] font-semibold text-green underline underline-offset-4"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={label}>Full name</span>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'err-name' : undefined}
                          className={`${field} ${errors.name ? 'border-red-400' : 'border-ink/12'}`}
                        />
                        {errors.name && (
                          <span id="err-name" className={err}>
                            {errors.name}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className={label}>Phone number</span>
                        <input
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+92 3XX XXXXXXX"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'err-phone' : undefined}
                          className={`${field} ${errors.phone ? 'border-red-400' : 'border-ink/12'}`}
                        />
                        {errors.phone && (
                          <span id="err-phone" className={err}>
                            {errors.phone}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={label}>What do you need</span>
                        <select
                          name="department"
                          value={form.department}
                          onChange={set('department')}
                          aria-invalid={Boolean(errors.department)}
                          aria-describedby={errors.department ? 'err-department' : undefined}
                          className={`${field} appearance-none ${errors.department ? 'border-red-400' : 'border-ink/12'}`}
                        >
                          <option value="">Choose a department</option>
                          {departments.items.map((d) => (
                            <option key={d.title} value={d.title}>
                              {d.title}
                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <span id="err-department" className={err}>
                            {errors.department}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className={label}>Preferred time</span>
                        <select
                          name="slot"
                          value={form.slot}
                          onChange={set('slot')}
                          className={`${field} appearance-none border-ink/12`}
                        >
                          {slots.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className={label}>Brief note</span>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="A short description of the problem, and anything the doctor should know before you arrive."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'err-message' : undefined}
                        className={`${field} resize-none ${errors.message ? 'border-red-400' : 'border-ink/12'}`}
                      />
                      {errors.message && (
                        <span id="err-message" className={err}>
                          {errors.message}
                        </span>
                      )}
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={set('consent')}
                        aria-invalid={Boolean(errors.consent)}
                        className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-green"
                      />
                      <span className="text-[13px] leading-relaxed text-slate">
                        I agree that Verdant Clinic may contact me on the number above about this appointment.
                        My details are not shared with anyone else.
                      </span>
                    </label>
                    {errors.consent && <span className={err}>{errors.consent}</span>}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green py-4 text-[15px] font-semibold text-white transition-colors hover:bg-forest"
                    >
                      Request an appointment
                    </button>

                    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
                      <p className="text-[12.5px] text-fog">
                        Prefer to talk? Call {brand.phone}. Emergencies handled at any hour.
                      </p>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-green underline underline-offset-4"
                      >
                        <MessageCircle size={13} />
                        Send on WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-ink/8 bg-white px-5 py-4">
                <ShieldCheck size={17} className="mt-0.5 shrink-0 text-green" />
                <p className="text-[12.5px] leading-relaxed text-slate">
                  Your medical details stay with your treating doctor. Nothing on this form is shared with
                  third parties, and we never ask for payment before your appointment.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
