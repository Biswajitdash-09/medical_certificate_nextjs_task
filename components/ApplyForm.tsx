"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Brand } from "@/brands/types";

type Errors = Partial<Record<"type" | "firstName" | "lastName" | "email" | "age" | "reason" | "ack", string>>;

// Our own application form: validates like a real one, but submit only shows an honest prototype notice; nothing is sent or charged
export function ApplyForm({ brand, initialType }: { brand: Brand; initialType?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const typeRef = useRef<HTMLSelectElement>(null);

  // A service page links here with ?type=<slug>; read it on the client so the page itself stays static
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("type");
    if (!initialType && wanted && typeRef.current && brand.services.some((s) => s.slug === wanted)) typeRef.current.value = wanted;
  }, [brand, initialType]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (!get("type")) next.type = "Choose the certificate you need.";
    if (!get("firstName")) next.firstName = "Enter your first name.";
    if (!get("lastName")) next.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = "Enter an email address you can access.";
    const age = Number(get("age"));
    if (!get("age") || !Number.isInteger(age) || age < 1 || age > 120) next.age = "Enter your age in years.";
    // dr serves people aged 16 and over (live site rule); gmc sets no minimum on its homepage
    else if (brand.minAge && age < brand.minAge) next.age = `${brand.name} is for people aged ${brand.minAge} or older.`;
    if (!get("reason")) next.reason = "Tell the doctor why you need the certificate.";
    if (!f.get("ack")) next.ack = "Please confirm you have read the points above.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
    else e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-slate-200 bg-white p-8">
        <h2 className="text-[28px]">This is a prototype</h2>
        <p className="mt-3 max-w-prose text-slate-700">
          Your answers passed every check, but nothing was sent or charged. This page shows how {brand.name}&apos;s application could work inside the site.
        </p>
        <a href={`/${brand.id}`} className="btn-ghost mt-6">Back to {brand.name}</a>
      </div>
    );
  }

  const field = "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[17px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-red-600";
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-error`} className="mt-1.5 text-sm text-red-700">{errors[k]}</p>;
  const a11y = (k: keyof Errors) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="type" className="font-medium">Certificate type</label>
        <select ref={typeRef} id="type" name="type" defaultValue={initialType ?? ""} className={field} {...a11y("type")}>
          <option value="" disabled>Choose a certificate</option>
          {brand.services.map((s) => <option key={s.slug} value={s.slug}>{s.title}{s.price ? ` · ${s.price}` : ""}</option>)}
        </select>
        {err("type")}
      </div>

      <fieldset>
        <legend className="font-medium">Name of the patient</legend>
        <div className="mt-1.5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm text-slate-600">First name</label>
            <input id="firstName" name="firstName" autoComplete="given-name" className={field} {...a11y("firstName")} />
            {err("firstName")}
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm text-slate-600">Last name</label>
            <input id="lastName" name="lastName" autoComplete="family-name" className={field} {...a11y("lastName")} />
            {err("lastName")}
          </div>
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="email" className="font-medium">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="age" className="font-medium">Age</label>
          <input id="age" name="age" type="number" inputMode="numeric" min={brand.minAge ?? 1} className={field} {...a11y("age")} />
          {err("age")}
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="font-medium">Reason for the certificate</label>
        <textarea id="reason" name="reason" rows={4} className={field} {...a11y("reason")} />
        {err("reason")}
      </div>

      <div className="rounded-2xl bg-surface p-5">
        <ul className="space-y-2 text-sm text-slate-700">
          {brand.legal.flatMap((g) => g.points).map((p) => <li key={p} className="border-l-2 border-brand pl-3">{p}</li>)}
        </ul>
        <label className="mt-4 flex gap-3 font-medium">
          <input type="checkbox" name="ack" className="mt-1 size-5 accent-[var(--primary)]" {...a11y("ack")} />
          I have read the points above.
        </label>
        {err("ack")}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">Submit application</button>
      <p className="text-sm text-slate-600">Prototype: nothing is sent or charged.</p>
    </form>
  );
}
