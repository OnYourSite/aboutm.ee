"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [msg, setMsg] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const text = String(f.get("message") ?? "").trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || text.length < 5) {
      setMsg("Bitte fülle alle Felder korrekt aus.");
      return;
    }
    const subject = encodeURIComponent(`Anfrage von ${name}`);
    const body = encodeURIComponent(`${text}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setMsg("Dein E-Mail-Programm öffnet sich. Danke für deine Nachricht!");
  };
  return (
    <form className="form" onSubmit={submit} noValidate>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>E-Mail<input name="email" type="email" autoComplete="email" required /></label>
      <label>Nachricht<textarea name="message" rows={6} required /></label>
      <button className="btn btn-primary" type="submit">Nachricht senden</button>
      <p className="msg" role="status">{msg}</p>
    </form>
  );
}
