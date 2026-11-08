"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [msg, setMsg] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setMsg(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? "Danke! Du bist auf der Liste." : "Bitte gib eine gültige E-Mail-Adresse ein.");
  };
  return (
    <>
      <form className="news" onSubmit={submit} noValidate>
        <input type="email" name="email" placeholder="deine@email.de" autoComplete="email" required aria-label="E-Mail-Adresse" />
        <button className="btn btn-primary" type="submit">Anmelden</button>
      </form>
      <p className="msg" role="status">{msg}</p>
    </>
  );
}
