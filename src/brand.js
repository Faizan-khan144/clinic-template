export const brand = {
  name: 'Verdant Clinic',
  tagline: 'Care without the wait',
  description:
    'Verdant Clinic is a modern multi-specialty practice offering general medicine, dentistry, and diagnostics under one roof.',
  phone: '+92 300 000 0000',
  whatsapp: '+92 300 000 0000',
  email: 'care@verdantclinic.com',
  address: '12 Zamzama Boulevard, Phase V, Karachi',
  mapsUrl: 'https://maps.google.com/',
  location: 'Karachi, Pakistan',
  hours: [
    { days: 'Monday to Friday', time: '9:00 AM - 8:00 PM' },
    { days: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { days: 'Sunday', time: 'Emergency only' },
  ],
}

export const nav = [
  { label: 'Departments', href: '#departments' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'How it works', href: '#process' },
  { label: 'Clinic', href: '#clinic' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Multi-specialty clinic',
  headline: ['Care that does not', 'make you wait.'],
  body: 'Consult a specialist the same day, run your diagnostics on site, and walk out with a plan you actually understand.',
  primary: { label: 'Book an appointment', href: '#contact' },
  secondary: { label: 'View departments', href: '#departments' },
  image: '/images/hero.jpg',
}

export const marquee = [
  'General medicine',
  'Dentistry',
  'Diagnostics',
  'Physiotherapy',
  'Dermatology',
  'Pediatrics',
  'Pharmacy',
]

export const intro = {
  kicker: 'Why patients choose us',
  lines: ['Most clinics make you', 'wait three weeks', 'to be told to come back.'],
  highlight:
    'Same-day consultations, in-house diagnostics and one doctor who owns your problem from the first visit to the last.',
  body: 'We built Verdant around the opposite idea. Short waits, same-day consultations, and every test you need under one roof. You see one doctor who owns your problem from the first visit to the last.',
  image: '/images/reception.jpg',
  points: [
    { title: 'Same-day slots', body: 'Book a consultation before your day starts and be seen the same afternoon.' },
    { title: 'On-site diagnostics', body: 'Bloodwork, imaging, and pharmacy without a second building.' },
    { title: 'One doctor, one thread', body: 'The specialist you meet is the one who follows up with you.' },
  ],
}

export const departments = {
  kicker: 'Departments',
  title: 'Everything under one roof',
  items: [
    {
      title: 'General medicine',
      body: 'Everyday health, chronic conditions, and second opinions from an experienced physician.',
      image: '/images/consult.jpg',
    },
    {
      title: 'Dentistry',
      body: 'Routine check-ups, restorative work, and same-day emergency slots reserved daily.',
      image: '/images/dental.jpg',
    },
    {
      title: 'Diagnostics',
      body: 'Laboratory, imaging, and blood panels processed in-house with same-day results.',
      image: '/images/lab.jpg',
    },
    {
      title: 'Physiotherapy',
      body: 'Sports injury recovery, post-operative rehabilitation, and chronic pain programmes.',
      image: '/images/care.jpg',
    },
    {
      title: 'Dermatology',
      body: 'Skin, hair, and nail concerns treated with evidence-based plans rather than guesswork.',
      image: '/images/checkup.jpg',
    },
    {
      title: 'Pharmacy',
      body: 'An in-house dispensary so your prescription is filled before you leave the building.',
      image: '/images/pharmacy.jpg',
    },
  ],
}

export const doctors = {
  kicker: 'Our doctors',
  title: 'The people who will actually treat you',
  body: 'Every clinician here has spent years in practice, not just in lectures. You will meet them in person on your first visit.',
  items: [
    {
      name: 'Dr. Ayesha Rahman',
      role: 'General physician',
      quals: 'MBBS, FCPS',
      image: '/images/doctor1.jpg',
      note: 'Internal medicine and long-term condition management.',
    },
    {
      name: 'Dr. Bilal Ahmed',
      role: 'Consultant dentist',
      quals: 'BDS, MS',
      image: '/images/doctor2.jpg',
      note: 'Restorative dentistry and same-day emergency care.',
    },
    {
      name: 'Dr. Sana Qureshi',
      role: 'Dermatologist',
      quals: 'MBBS, FCPS',
      image: '/images/doctor3.jpg',
      note: 'Clinical dermatology and long-term skin health plans.',
    },
    {
      name: 'Dr. Omar Sheikh',
      role: 'Physiotherapist',
      quals: 'DPT, MSPT',
      image: '/images/doctor4.jpg',
      note: 'Sports rehabilitation and post-operative recovery.',
    },
  ],
}

export const stats = [
  { value: 12, suffix: ' yrs', label: 'Serving the neighbourhood' },
  { value: 18, suffix: 'k+', label: 'Patients treated' },
  { value: 6, suffix: '', label: 'Departments' },
  { value: 24, suffix: ' hrs', label: 'Emergency availability' },
]

export const process = {
  kicker: 'How a visit works',
  title: 'Four steps, no queue',
  steps: [
    {
      title: 'Book',
      body: 'Call, message, or send the form below. You get a confirmed slot, usually the same day.',
      meta: 'Under 5 minutes',
    },
    {
      title: 'Consult',
      body: 'A specialist sees you in a private room with your history already pulled up before you sit down.',
      meta: '20 to 30 minutes',
    },
    {
      title: 'Diagnose',
      body: 'Any bloodwork or imaging happens on site. Most results come back before you leave the building.',
      meta: 'Same day',
    },
    {
      title: 'Follow up',
      body: 'You leave with a written plan, a filled prescription, and a direct line to your doctor if anything changes.',
      meta: 'Always open',
    },
  ],
}

export const clinic = {
  kicker: 'The clinic',
  title: 'Built to feel calm, not clinical',
  body: 'Verdant was designed around how patients actually feel when they walk in. Natural light, short corridors, and separate waiting areas so you are never made to sit through a crowded room. Every department shares one reception, one record system, and one team.',
  image: '/images/building.jpg',
  secondaryImage: '/images/equipment.jpg',
  facts: [
    { label: 'Opened', value: '2014' },
    { label: 'Floor area', value: '9,000 sq ft' },
    { label: 'Parking', value: 'On-site, free' },
    { label: 'Wheelchair access', value: 'Step-free throughout' },
  ],
}

export const testimonial = {
  quote:
    'I came in with a fever on a Wednesday morning and left with lab results, a diagnosis, and the medicine in hand. I have never had that happen anywhere else in this city.',
  author: 'Patient since 2019',
  image: '/images/consult2.jpg',
}

export const contact = {
  kicker: 'Book a visit',
  title: 'See a doctor today',
  body: 'Send a short note about what you need and we will confirm a slot by phone, usually within the hour.',
  email: brand.email,
  cta: brand.phone,
}