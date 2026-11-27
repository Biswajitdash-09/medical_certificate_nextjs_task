import type { Brand } from "./types";

// GetMedicalCertificate (Europe): copy taken verbatim from getmedicalcertificate.com; testimonials, competitor table, blog and tools are cut, not rewritten
export const gmc: Brand = {
  id: "gmc",
  name: "GetMedicalCertificate",
  domains: ["getmedicalcertificate.com", "www.getmedicalcertificate.com"],
  icon: "/brands/gmc-icon.svg",
  logo: { src: "/brands/gmc-logo.svg", alt: "GetMedicalCertificate", width: 230 },
  colors: { primary: "#d6303a", primaryText: "#ffffff", accent: "#470087", bg: "#F6F4F9", text: "#1a1033" },
  ctaLabel: "Get a certificate",
  ctaHref: "https://forms.getmedicalcertificate.com/healthworkstech/form/GetYourMedicalCertificateNow/formperma/Bj5SHi3vWq2NM-1azgtWfnE_NvPXUERoDzL63fw6ug8",
  ctaNote: "You'll continue on the secure GetMedicalCertificate application form.",
  // Verbatim from the note at the top of gmc's own application form (forms.getmedicalcertificate.com), shown before the click
  beforeYouStart: {
    title: "Before you fill out the form",
    items: [
      { text: "Your name as per your Govt ID proof" },
      { text: "Certificates are issued in English." },
      { text: "Please review the sample certificate and confirm its acceptance with your organization before proceeding.", href: "https://getmedicalcertificate.com/samples/" },
      { text: "Consultations occur via chat, and our team may contact you for additional details if needed." },
      { text: "Working Hours: 10:00 AM – 8:00 PM IST, 7 days a week, including public holidays. Orders outside these hours are handled in the next working slot." },
    ],
  },
  nav: [
    { label: "Certificates", href: "#services" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Countries", href: "#countries" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    eyebrow: "Telemedicine & medical certificates",
    title: "Get a medical certificate online - same day from €34.99",
    body: "Certificates from registered doctors, delivered the same-day as a PDF your employer or institution can verify.",
    bullets: [
      "Same-day delivery - usually within 30 minutes of a doctor approving your case",
      "Registered doctors - every case reviewed by a registered doctor and released with their stamp and signature",
      "GDPR compliant - encrypted, never shared",
      "40+ countries across Europe and the EEA",
    ],
    // Stand-in photograph (Wikimedia Commons) until the client supplies its own; no face, no brand names
    visual: {
      kind: "photo",
      src: "/img/photo-f196010783.webp",
      alt: "A person at a home desk holding their lower back in discomfort",
      width: 1280,
      height: 853,
      credit: "Photo: Shixart1985, CC BY 2.0, via Wikimedia Commons",
    },
  },
  statement: "A certificate anyone can check - in seconds.",
  portal: { region: "40+ countries across Europe and the EEA", price: "From €34.99", ground: "#470087" },
  servicesTitle: "Choose your certificate",
  services: [
    { title: "Sick Leave Certificate", href: "https://getmedicalcertificate.com/sick-leave-certificate/", body: "Work or school absence due to illness, usually from day 8", price: "€34.99" },
    { title: "Fitness Certificate", href: "https://getmedicalcertificate.com/fitness-certificate/", body: "General clearance that you are fit for physical activity", price: "€34.99" },
    { title: "Sports Fitness Certificate", href: "https://getmedicalcertificate.com/sports-fitness-certificate/", body: "Medical clearance to train and compete in sport", price: "€34.99" },
    { title: "Unfit to Travel", body: "A GP’s certificate stating you are unfit to travel, for flight or booking cancellations.", price: "€34.99" },
  ],
  steps: [
    { title: "Fill out the form", body: "A quick, secure questionnaire - your details, health issue, and the reason you need a certificate." },
    { title: "A doctor reviews your case", body: "A licensed health professional reviews your case and reaches out for any additional detail they need." },
    { title: "Receive your certificate", body: "Once approved, your signed digital medical certificate arrives as a PDF in your inbox." },
  ],
  countries: [
    "Albania", "Andorra", "Austria", "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
    "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein",
    "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland",
    "Portugal", "Romania", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom",
  ],
  legal: [
    {
      heading: "Who it's for",
      points: [
        "Not for medical emergencies - dial 112 for emergency services anywhere in the EU.",
      ],
    },
    {
      heading: "Before you submit",
      points: [
        "Acceptance for absences can still depend on your employer’s own policy, so check your staff handbook.",
        "Some official processes - visas in particular - may additionally require translation or notarisation, so confirm the exact requirement with whoever is asking for it.",
      ],
    },
    {
      heading: "Your data",
      points: [
        "The reviewing doctor is the only person with access to your medical information.",
        "Your data is encrypted and handled under UK & EU GDPR and ISO 27001 standards.",
      ],
    },
  ],
  faq: [
    { q: "How much does an online medical certificate cost?", a: "Every certificate costs €34.99 - sick leave, fitness, sports fitness and unfit to travel. A sports fitness certificate stays valid for 12 months. The price includes the doctor’s review, your certificate PDF, and same-day email delivery. There is nothing added at checkout." },
    { q: "Can my employer reject a certificate issued online?", a: "A certificate from a registered doctor is valid whether the consultation happened online or in person, and employers generally accept it on that basis. Yours carries the doctor’s name, registration number and signature, so an employer can confirm it is genuine rather than take it on trust. Acceptance for absences can still depend on your employer’s own policy, so check your staff handbook." },
    { q: "How long does it take?", a: "Most certificates are reviewed and issued within about 30 minutes. It can take longer at busy periods, or if the doctor needs more detail or a short video call before deciding. Your PDF arrives by email as soon as it is approved." },
    { q: "Are online medical certificates valid?", a: "Yes. What makes a certificate valid is that a properly registered doctor made a genuine clinical assessment - not whether you were in the room. Every certificate includes the doctor’s credentials, registration number, digital signature and a unique verification code." },
    { q: "Which type of certificate do I need?", a: "It depends on who is asking. For work or school absence you need a sick leave certificate. For gym membership or general activity clearance, a fitness certificate. For training and competition, a sports fitness certificate. For flight and hotel cancellation, an unfit to travel certificate. The services page compares all different certificates side by side." },
    { q: "Can I request a certificate for someone else?", a: "A parent or guardian can request one for a child, and a carer can request one for the person they look after. Complete the assessment on their behalf with accurate medical history. Where the person is an adult who can answer for themselves, they should complete it themselves." },
    { q: "Does it work outside the UK?", a: "Yes. Our doctors are registered across Europe and the EEA, and certificates are recognised in 40+ countries. Some official processes - visas in particular - may additionally require translation or notarisation, so confirm the exact requirement with whoever is asking for it." },
    { q: "When do I have to give the certificate to my employer?", a: "In the UK you can self-certify for the first 7 calendar days and need a fit note from day 8. Elsewhere the window is usually 2–3 days from the start of the absence. Same-day delivery means you can meet either deadline, but send it on as soon as it arrives." },
  ],
  contact: { emergency: "Not for medical emergencies - dial 112 for emergency services anywhere in the EU." },
  meta: {
    title: "Get a Medical Certificate Online - Same Day From €34.99 | Registered Doctors",
    description: "Certificates from registered doctors, delivered the same-day as a PDF your employer or institution can verify.",
    url: "https://getmedicalcertificate.com/",
  },
};
