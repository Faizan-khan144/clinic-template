# Verdant Clinic

A cinematic, mobile-first marketing site for a multi-specialty clinic. Built with React, Vite, Tailwind CSS and Framer Motion.

## Highlights

- Scroll-driven animations: masked text reveals, parallax imagery, sticky storytelling
- Fully responsive from 320px up, with a dedicated mobile navigation
- Accessibility built in: reduced-motion support, semantic landmarks, focus states, alt text
- Real photography, no placeholder gradients
- Green and white design system driven by CSS custom properties

## Stack

| Package | Version |
|---|---|
| React | 19.2 |
| Vite | 8.3 |
| Tailwind CSS | 4.3 |
| Framer Motion | 13.4 |
| lucide-react | 1.47 |

## Getting started

```bash
npm install
npm run dev      # local development server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
public/images/      Photography used across the site
src/
  App.jsx           Section composition
  brand.js          All copy and data (clinic details, doctors, departments)
  index.css         Tailwind entry plus design tokens
  components/
    Nav.jsx         Fixed header with mobile menu
    Hero.jsx        Full-height hero with parallax and ken-burns
    Marquee.jsx     Infinite scrolling specialty strip
    Intro.jsx       Positioning statement
    Departments.jsx Department list with a sticky image preview
    Stats.jsx       Animated counters
    Doctors.jsx     Clinician cards
    Process.jsx     Sticky visit timeline
    Clinic.jsx      Facility section
    Testimonial.jsx Parallax patient quote
    Contact.jsx     Booking form, address, hours
    Footer.jsx      Footer
    Reveal.jsx      Shared animation primitives
```

## Editing content

Everything editable lives in `src/brand.js`: clinic name, phone, address, opening hours, departments, doctor names and photos, and the booking form copy. No component needs to change for a content update.

Swap photography by replacing the files in `public/images/` and keeping the filenames, or by pointing the paths in `brand.js` to new images.

## Design tokens

Defined in `src/index.css` under `@theme`:

- `paper`, `mist`, `haze` — surfaces
- `ink`, `graphite`, `slate`, `fog` — text
- `green`, `leaf`, `forest`, `moss` — brand accents

Re-theming the whole site means editing these values only.

## Notes

- Contact and booking forms are front-end only and need a backend or form service wired up before going live.
- Photography is from Unsplash and should be replaced with the clinic's own images.
- Placeholder phone, email and address values need replacing before deployment.