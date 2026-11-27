import type { Brand } from "./types";

// DrCertificate (South East Asia): all copy below is taken verbatim from drcertificate.com; repeated blocks are merged, not reworded
export const dr: Brand = {
  id: "dr",
  name: "DrCertificate",
  domains: ["drcertificate.com", "www.drcertificate.com"],
  icon: "/brands/dr-icon.svg",
  logo: { src: "/brands/dr-logo.svg", alt: "Dr. Certificate", width: 170 },
  // Accent is green-700: the lighter live green failed WCAG contrast on the pale hero background
  colors: { primary: "#1e489d", primaryText: "#ffffff", accent: "#15803d", bg: "#F2F5F9", text: "#0f172a" },
  ctaLabel: "Apply now",
  ctaHref: "/dr/apply",
  minAge: 16,
  ctaNote: "You'll continue on the secure DrCertificate application form.",
  // The live homepage's "Before you start" list, restored so people arrive at the form ready
  beforeYouStart: {
    title: "Before you start",
    items: [
      { text: "Your full name, age and contact details" },
      { text: "An email address you can access: that's where your certificate goes" },
      { text: "The certificate type, and the dates or purpose it is for" },
      { text: "Accurate information about your symptoms or health" },
    ],
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Price", href: "#facts" },
    { label: "Countries", href: "#countries" },
    { label: "FAQs", href: "#faq" },
  ],
  hero: {
    eyebrow: "Online medical certificates · Reviewed by certified doctors",
    title: "Medical certificates, without the unnecessary hassle.",
    body: "Fill in a short online form from your phone or laptop. A certified doctor checks your details. When approved, your certificate is sent to your email.",
    bullets: ["A certified doctor (MBBS, MD or MS) issues the certificate.", "Emailed if approved", "Apply from your phone", "Payments processed by Stripe"],
    // The live hero's certificate illustration, field for field; the SAMPLE watermark stays so it can never pass as a real certificate
    visual: {
      kind: "certificate",
      photo: { src: "/img/gen/dr-hero.webp", alt: "Someone resting on a sofa at home under a blanket, checking their phone" },
      brandLine: "DrCertificate",
      title: "Medical Certificate",
      type: "Sick leave",
      fields: [
        { label: "Patient name", value: "Sample Applicant" },
        { label: "Age", value: "28 years" },
        { label: "Date of issue", value: "DD MMM YYYY" },
        { label: "Rest advised", value: "As decided by the doctor" },
      ],
      assessment: "This is to certify that the above-named applicant was assessed through a medical review.",
      signer: "Certified doctor",
      reg: "Reg. no. ••••••",
      seal: "Doctor reviewed",
      watermark: "SAMPLE",
    },
  },
  statement: "The doctor decides. Nothing is approved automatically.",
  portal: { region: "10 South East Asian countries", price: "25 SGD in Singapore", ground: "#1E489D" },
  servicesTitle: "Choose the certificate you need",
  services: [
    {
      slug: "sick-leave",
      title: "Sick leave certificate",
      photo: { src: "/img/gen/dr-sick-leave.webp", alt: "A bedside table with tea and a closed laptop in morning light" },
      body: "Documents a period of illness for your workplace, college or school, subject to their policies.",
      uses: ["Office leave", "College or school absence"],
    },
    {
      slug: "medical-fitness",
      title: "Medical fitness certificate",
      // Generated stand-in photo; completes the set so the services grid can show photos
      photo: { src: "/img/gen/dr-fitness.webp", alt: "Someone tying their running shoes on a park path at sunrise" },
      body: "For jobs, university admission, travel, airlines or other purposes where a doctor's opinion on your fitness is asked for.",
      uses: ["Joining a new job", "College admission", "Sports and physical activities"],
    },
    {
      slug: "unfit-to-fly",
      title: "Unfit to fly certificate",
      // Generated stand-in photo of a trip on hold
      photo: { src: "/img/gen/dr-unfit-to-fly.webp", alt: "A packed carry-on suitcase and jacket waiting by an apartment door" },
      body: "For when illness, injury or another health concern means you shouldn't travel by air.",
      uses: ["Illness before a flight", "Injury or recovery"],
    },
    {
      slug: "general",
      title: "General medical certificate",
      photo: { src: "/img/gen/dr-general.webp", alt: "A hand resting on a document envelope on a home desk" },
      body: "For other personal or official needs where a doctor's certificate is requested.",
      uses: ["Personal records", "Official or administrative requests"],
    },
  ],
  steps: [
    {
      title: "Fill in the online application",
      body: "Add your details and the reason for your request. You may be asked to share vitals or other measurements through a secure link sent by email.",
    },
    {
      title: "A certified doctor reviews your request",
      body: "The doctor assesses the information you provide and decides whether a certificate is medically appropriate. They may decline a request.",
    },
    {
      title: "Get your certificate by email, if approved",
      body: "Approved certificates are sent electronically to the email address you provide.",
    },
  ],
  facts: [
    {
      label: "Price",
      // Live site (2026-11-27) says 349 pesos here but 399 pesos in its price table; each copied as written
      value: "It is dynamic and depends on your country, for example 25 SGD in Singapore, 349 pesos in the Philippines or 30 MYR in Malaysia. Check the price at the bottom of your form. You pay once through Stripe when you submit the form.",
    },
    {
      label: "Time",
      value: "About 30 minutes after getting all details. For fitness cases, doctors are available 9 am to 9 pm IST from Monday to Saturday, and 10 am to 8 pm IST on Sunday.",
    },
    {
      label: "Who reviews it",
      value: "A certified doctor (MBBS, MD or MS). All doctors on the platform are registered medical council doctors.",
    },
    {
      label: "If the doctor declines",
      value: "Doctors' approval rate is more than 98% of all requests. Rejection happens usually when details do not match or symptoms are inconsistent.",
    },
    {
      label: "How long a note covers",
      value: "In most South East Asian countries, sick leave and work from home notes go up to 7 days for generic symptoms, and fitness notes are generally valid for 30 days. The doctor decides.",
    },
    { label: "Medical reviewer", value: "Dr Urooj Arshad, M.B.B.S, General Medicine, IMC | GMC 430548" },
  ],
  priceTable: [
    { country: "Singapore", price: "25 SGD" },
    { country: "Philippines", price: "399 pesos" },
    { country: "Malaysia", price: "30 MYR" },
    { country: "Other served countries", price: "Depends on the country" },
  ],
  countries: ["Singapore", "Indonesia", "Philippines", "Thailand", "Vietnam", "Malaysia", "Cambodia", "Laos", "Myanmar", "Brunei"],
  legal: [
    {
      heading: "Who it's for",
      points: [
        "DrCertificate is right for you if you are 16 or older, live in one of the 10 countries served and need a certificate for a non emergency situation.",
        "Our certificates cannot be used for submission in India, for legal purposes or for insurance.",
        "The doctors on DrCertificate do not diagnose, treat or prescribe. Consultations happen by digital chat only, with no video or in person visits.",
        "If you have chest pain, trouble breathing, heavy bleeding or other urgent symptoms, go to the nearest emergency department or call local emergency services.",
      ],
    },
    {
      heading: "Before you submit",
      points: [
        "Please check with the place of submission that online medical notes are accepted before you apply.",
        "Every request is assessed individually. Issuing a certificate, its content and its duration are at the reviewing doctor's discretion.",
        "All documents are addressed to the organisation they are submitted to and are valid for single use only. Acceptance depends on the organisation you submit it to.",
        "Per our Privacy Policy, data is stored on encrypted servers, generally deleted or anonymised 15 days after the transaction unless the law requires longer, and never sold or rented.",
      ],
    },
    {
      heading: "Payment & refunds",
      points: [
        "Payments are non refundable, and a declined request is not refunded. The one exception is a verified technical fault reported within 24 hours.",
        "The fee pays for an independent doctor to review your request. Paying does not guarantee a certificate.",
      ],
    },
  ],
  faq: [
    { q: "What is an online doctor certificate?", a: "An online doctor certificate is a document from a doctor about your health status. It can record illness or physical fitness. With DrCertificate, a certified doctor (MBBS, MD or MS) reviews your request and decides whether to issue one. Acceptance depends on the organisation you submit it to, so check first." },
    { q: "When will I receive my medical certificate?", a: "It usually takes about 30 minutes. For fitness cases, doctors review requests from 9 am to 9 pm IST Monday to Saturday, and 10 am to 8 pm IST on Sunday. If the doctor approves your request, your certificate is sent to your email as a PDF." },
    { q: "Which doctor can issue a medical certificate?", a: "On DrCertificate, a certified doctor (MBBS, MD or MS) issues the certificate. The certificate is not for submission in India." },
    { q: "Are these medical certificates genuine?", a: "A certified doctor (MBBS, MD or MS) issues each certificate after reviewing your request, and the doctor may decline it. An approved certificate is a PDF with the doctor's registration number, digital signature and date. Acceptance depends on the organisation you submit it to, so check first." },
    { q: "Is there an upper limit of sick leaves one can get?", a: "The duration of sick leave depends on the medical assessment and the doctor’s discretion. Each case is individually evaluated. Specific institutional policies may also apply." },
    { q: "In which case do I need to visit a doctor physically or get an online consultation?", a: "See a doctor in person if you are hospitalized, undergoing specialized treatment or have emergency symptoms. An online consultation can suit common, non-emergency situations, and the doctor may decline a request and advise an in-person visit. Acceptance depends on the organisation you submit it to, so check first." },
    { q: "Is there a medical leave format for students?", a: "Yes. The sick leave option covers students too, and an approved certificate gives the rest duration and the doctor's details to show your school or university. Ask them first whether they accept online medical notes." },
    { q: "How to get a fitness medical certificate?", a: "You can apply by filling out a form with your health details. A certified doctor reviews them, may contact you by secure digital chat, and decides whether to issue a certificate about your fitness for activities such as study, work or travel." },
    { q: "Will my health insurance cover the costs?", a: "Coverage of medical certificates by health insurance varies depending on the insurance policy. Typically, costs for online medical certificates are paid out of pocket unless explicitly covered by your health insurance plan in general telemedicine practice." },
    { q: "Which countries do you operate in?", a: "DrCertificate lists 10 countries in South East Asia: Singapore, Indonesia, the Philippines, Thailand, Vietnam, Malaysia, Cambodia, Laos, Myanmar and Brunei. Available services can differ, so check your country's page before you apply." },
    { q: "What happens if the doctor does not issue my certificate?", a: "If the doctor declines your request, your payment is not refunded, because the fee pays for the doctor's review and not a guaranteed certificate. Doctors decline about 2% of requests, usually when the name and ID do not match or when the symptoms and details shared are inconsistent." },
    { q: "Who sees the health information I share?", a: "Your details go to the independent doctor who reviews your request, who uses them to decide whether to issue a certificate. For questions about how DrCertificate stores or handles your personal and health data, email care@drcertificate.com before you apply. Share only accurate details, because mismatched information is a common reason for refusal." },
    { q: "Who can use DrCertificate?", a: "DrCertificate is for people aged 16 or older in the 10 South East Asian countries the platform serves. Certificates are not for submission in India, not for legal purposes and not for insurance. The service suits non emergency situations only, and it offers chat consultations, not video or in person visits." },
    { q: "Does DrCertificate offer recovery or caretaker certificates?", a: "DrCertificate does not offer recovery or caretaker certificates, and the application form has no option for them. The form covers four options only: sick leave, unfit to travel, work from home and medical fitness. If you need a recovery or caretaker note, ask a local clinic." },
    { q: "Can a certificate be corrected after it is issued?", a: "No, a certificate cannot be corrected once issued, unless the error came from the medical team. Check your name, ID and dates carefully on the form before paying. Payments are non refundable, except for a verified technical fault reported within 24 hours." },
    { q: "How long is a medical certificate valid?", a: "In most South East Asian countries, sick leave and work from home notes cover up to 7 days for generic symptoms, and fitness notes are generally valid for 30 days. The doctor decides the dates on your certificate, and your employer or school applies its own rules." },
  ],
  contact: {
    email: "care@drcertificate.com",
    address: "DrCertificate is run by Health Venture OU, KMC Armstrong Corporate Center, H.V. Dela Costa, Salcedo Village, Makati City, 1227 Metro Manila, Philippines.",
  },
  meta: {
    title: "DrCertificate - Medical certificates, without the unnecessary hassle",
    description: "Fill in a short online form. A certified doctor (MBBS, MD or MS) reviews your request, and approved certificates are emailed as a PDF.",
    url: "https://drcertificate.com/",
  },
  locales: ["en", "fil", "id", "ms", "th", "vi", "km", "lo", "my"],
  socials: [
    { kind: "x", href: "https://x.com/drcertificate" },
    { kind: "instagram", href: "https://www.instagram.com/drcertificate" },
    { kind: "linkedin", href: "https://www.linkedin.com/company/drcertificate/" },
  ],
  megaNav: [
    {
      title: "Services",
      items: [
        { label: "Sick leave certificate", href: "/dr/sick-leave-certificate", blurb: "For work, school or college absence" },
        { label: "Medical fitness certificate", href: "/dr/medical-fitness-certificate", blurb: "For a new job, college or sports" },
        { label: "Unfit to fly certificate", href: "/dr/unfit-to-fly", blurb: "For flight, visa or travel changes" },
        { label: "General medical certificate", href: "/dr/general-medical-certificate", blurb: "For official or administrative requests" },
      ],
      seeAll: { label: "Explore services", href: "/dr#services" },
    },
    {
      title: "Countries",
      items: [
        { label: "Singapore", href: "/dr/sg/medical-certificates-online-in-singapore" },
        { label: "Indonesia", href: "/dr/id/medical-certificates-online-in-indonesia" },
        { label: "Philippines", href: "/dr/ph/medical-certificates-online-in-philippines" },
        { label: "Thailand", href: "/dr/th/medical-certificates-online-in-thailand" },
        { label: "Vietnam", href: "/dr/vn/medical-certificates-online-in-vietnam" },
        { label: "Malaysia", href: "/dr/my/medical-certificates-online-in-malaysia" },
        { label: "Cambodia", href: "/dr/cb/medical-certificates-online-in-cambodia" },
        { label: "Laos", href: "/dr/lo/medical-certificates-online-in-laos" },
        { label: "Myanmar", href: "/dr/mn/medical-certificates-online-in-myanmar" },
        { label: "Brunei", href: "/dr/br/medical-certificates-online-in-brunei" },
      ],
      seeAll: { label: "See all countries", href: "/dr#countries" },
    },
    {
      title: "Conditions",
      items: [
        {
          label: "Fever",
          href: "/dr/medical-certificate-for-fever",
          image: "/img/gen/cond-fever.webp",
          blurb: "Request a medical certificate for fever online in South East Asia. A certified doctor reviews your chat request, with approved PDFs sent by email.",
        },
        {
          label: "Flu",
          href: "/dr/medical-certificate-for-flu",
          image: "/img/gen/cond-flu.webp",
          blurb: "Get a medical certificate for flu online from a certified doctor after a chat consultation. PDF by email in about 30 minutes across South East Asia.",
        },
        {
          label: "Cold and cough",
          href: "/dr/medical-certificate-for-cold-and-cough",
          image: "/img/gen/cond-cold-and-cough.webp",
          blurb: "Obtain a cold and cough medical certificate online across South East Asia. A certified doctor reviews your request, and approved PDFs arrive by email.",
        },
        {
          label: "Back pain",
          href: "/dr/medical-certificate-for-back-pain",
          image: "/img/gen/cond-back-pain.webp",
          blurb: "Request a back pain medical certificate online. A certified doctor reviews your chat consultation and approved PDFs arrive by email in about 30 minutes.",
        },
        {
          label: "Food poisoning",
          href: "/dr/medical-certificate-for-food-poisoning",
          image: "/img/gen/cond-food-poisoning.webp",
          blurb: "Request a Medical Certificate for Food Poisoning through the web in South East Asia. A certified doctor reviews your request and approved PDFs arrive by email.",
        },
        {
          label: "Migraine",
          href: "/dr/medical-certificate-for-migraine",
          image: "/img/gen/cond-migraine.webp",
          blurb: "Get a medical certificate for migraine online from a certified doctor after a chat consultation. PDF by email in about 30 minutes across South East Asia.",
        },
      ],
    },
    {
      title: "Uses & Guides",
      items: [
        { label: "Fit to fly", href: "/dr/fit-to-fly-certificate" },
        { label: "Fit to work", href: "/dr/fit-to-work-certificate" },
        { label: "Work from home", href: "/dr/work-from-home-certificate" },
        { label: "Fitness for a new job", href: "/dr/medical-fitness-certificate-for-employment" },
        { label: "Sports fitness", href: "/dr/sports-fitness-certificate" },
        { label: "Students", href: "/dr/sick-leave-certificate-for-students" },
        { label: "IT employees", href: "/dr/sick-leave-certificate-for-it-employees" },
        { label: "BPO and call centre staff", href: "/dr/sick-leave-certificate-for-bpo-employees" },
        { label: "Bank employees", href: "/dr/sick-leave-certificate-for-bank-employees" },
        { label: "How to get a certificate online", href: "/dr/how-to-get-a-medical-certificate-online" },
        { label: "Is an online certificate valid?", href: "/dr/is-an-online-medical-certificate-valid" },
        { label: "What is a medical certificate?", href: "/dr/what-is-a-medical-certificate" },
        { label: "What a certificate should include", href: "/dr/what-should-a-medical-certificate-include" },
        { label: "Sick leave or fitness certificate?", href: "/dr/sick-leave-or-fitness-certificate" },
        { label: "If the doctor declines your request", href: "/dr/what-if-the-doctor-declines-your-request" },
      ],
      seeAll: { label: "All certificates and guides", href: "/dr/guides" },
    },
  ],
  footerColumns: [
    {
      title: "Certificates",
      links: [
        { label: "Sick leave", href: "/dr/sick-leave-certificate" },
        { label: "Medical fitness", href: "/dr/medical-fitness-certificate" },
        { label: "Unfit to fly", href: "/dr/unfit-to-fly" },
        { label: "General medical", href: "/dr/general-medical-certificate" },
        { label: "Fit to fly", href: "/dr/fit-to-fly-certificate" },
        { label: "Fit to work", href: "/dr/fit-to-work-certificate" },
        { label: "Work from home", href: "/dr/work-from-home-certificate" },
      ],
    },
    {
      title: "Countries",
      links: [
        { label: "Singapore", href: "/dr/sg/medical-certificates-online-in-singapore" },
        { label: "Indonesia", href: "/dr/id/medical-certificates-online-in-indonesia" },
        { label: "Philippines", href: "/dr/ph/medical-certificates-online-in-philippines" },
        { label: "Thailand", href: "/dr/th/medical-certificates-online-in-thailand" },
        { label: "Vietnam", href: "/dr/vn/medical-certificates-online-in-vietnam" },
        { label: "Malaysia", href: "/dr/my/medical-certificates-online-in-malaysia" },
        { label: "Cambodia", href: "/dr/cb/medical-certificates-online-in-cambodia" },
        { label: "Laos", href: "/dr/lo/medical-certificates-online-in-laos" },
        { label: "Myanmar", href: "/dr/mn/medical-certificates-online-in-myanmar" },
        { label: "Brunei", href: "/dr/br/medical-certificates-online-in-brunei" },
      ],
    },
    {
      title: "Company & Guides",
      links: [
        { label: "About Us", href: "/dr/about-us" },
        { label: "Contact", href: "/dr/contact" },
        { label: "FAQs", href: "/dr/faqs" },
        { label: "Guides", href: "/dr/guides" },
        { label: "Work with us", href: "/dr/work-with-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Refund & Cancellation Policy", href: "/dr/refund-cancellation-policy" },
        { label: "Privacy Policy", href: "/dr/privacy-policy" },
        { label: "Terms & Conditions", href: "/dr/terms-of-use" },
      ],
    },
  ],
};
