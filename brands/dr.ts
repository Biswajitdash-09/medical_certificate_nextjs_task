import type { Brand } from "./types";

// DrCertificate (South East Asia): all copy below is taken verbatim from drcertificate.com; repeated blocks are merged, not reworded
export const dr: Brand = {
  id: "dr",
  name: "DrCertificate",
  logo: { src: "/brands/dr-logo.svg", alt: "Dr. Certificate", width: 170 },
  // Accent is green-700: the lighter live green failed WCAG contrast on the pale hero background
  colors: { primary: "#1e489d", primaryText: "#ffffff", accent: "#15803d", bg: "#f5f8fd", text: "#0f172a" },
  ctaLabel: "Apply now",
  ctaHref: "https://forms.drcertificate.com/",
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
  },
  servicesTitle: "Choose the certificate you need",
  services: [
    {
      title: "Sick leave certificate",
      body: "Documents a period of illness for your workplace, college or school, subject to their policies.",
      uses: ["Office leave", "College or school absence"],
    },
    {
      title: "Medical fitness certificate",
      body: "For jobs, university admission, travel, airlines or other purposes where a doctor's opinion on your fitness is asked for.",
      uses: ["Joining a new job", "College admission", "Sports and physical activities"],
    },
    {
      title: "Unfit to fly certificate",
      body: "For when illness, injury or another health concern means you shouldn't travel by air.",
      uses: ["Illness before a flight", "Injury or recovery"],
    },
    {
      title: "General medical certificate",
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
      value: "It is dynamic and depends on your country, for example 25 SGD in Singapore, 399 pesos in the Philippines or 30 MYR in Malaysia. Check the price at the bottom of your form. You pay once through Stripe when you submit the form.",
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
    "Please check with the place of submission that online medical notes are accepted before you apply.",
    "Every request is assessed individually. Issuing a certificate, its content and its duration are at the reviewing doctor's discretion.",
    "All documents are addressed to the organisation they are submitted to and are valid for single use only. Acceptance depends on the organisation you submit it to.",
    "Payments are non refundable, and a declined request is not refunded. The one exception is a verified technical fault reported within 24 hours.",
    "The fee pays for an independent doctor to review your request. Paying does not guarantee a certificate.",
    "Our certificates cannot be used for submission in India, for legal purposes or for insurance.",
    "The doctors on DrCertificate do not diagnose, treat or prescribe. Consultations happen by digital chat only, with no video or in person visits.",
    "DrCertificate is right for you if you are 16 or older, live in one of the 10 countries served and need a certificate for a non emergency situation.",
    "If you have chest pain, trouble breathing, heavy bleeding or other urgent symptoms, go to the nearest emergency department or call local emergency services.",
    "Per our Privacy Policy, data is stored on encrypted servers, generally deleted or anonymised 15 days after the transaction unless the law requires longer, and never sold or rented.",
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
    title: "DrCertificate — Medical certificates, without the unnecessary hassle",
    description: "Fill in a short online form. A certified doctor (MBBS, MD or MS) reviews your request, and approved certificates are emailed as a PDF.",
  },
};
