import { doctors } from '../brand.js'
import { responsiveSrc } from './SmartImage.jsx'
import { FadeUp, MaskLines, SectionHead } from './Reveal.jsx'

export default function Doctors() {
  return (
    <section id="doctors" className="relative bg-paper px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={doctors.kicker} title={doctors.title} body={doctors.body} />

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-7">
          {doctors.items.map((doc, i) => (
            <FadeUp key={doc.name} delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-haze">
                  <img
                    src={doc.image}
                    srcSet={responsiveSrc(doc.image)}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    alt={doc.name}
                    width={1600}
                    height={2133}
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="absolute inset-x-4 bottom-4 translate-y-3 text-[12.5px] leading-snug text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {doc.note}
                  </p>
                </div>

                <div className="mt-5">
                  <h3 className="text-[17px] font-bold tracking-[-0.015em] text-ink">{doc.name}</h3>
                  <p className="mt-1 text-[13.5px] text-green">{doc.role}</p>
                  <p className="mt-0.5 text-[12.5px] text-fog">{doc.quals}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}