import Clinic from './components/Clinic.jsx'
import Contact from './components/Contact.jsx'
import { Cursor, ScrollProgress } from './components/Cursor.jsx'
import Departments from './components/Departments.jsx'
import Doctors from './components/Doctors.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import Marquee from './components/Marquee.jsx'
import MobileBar from './components/MobileBar.jsx'
import Nav from './components/Nav.jsx'
import Preloader from './components/Preloader.jsx'
import Process from './components/Process.jsx'
import Stats from './components/Stats.jsx'
import Testimonial from './components/Testimonial.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <a
        href="#departments"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-[13px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <MobileBar />
      <div className="grain relative">
        <main>
          <Hero />
          <Marquee />
          <Intro />
          <Departments />
          <Stats />
          <Doctors />
          <Process />
          <Clinic />
          <Testimonial />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  )
}
