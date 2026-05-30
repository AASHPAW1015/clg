import { useState } from "react";
import { Reveal } from "../components/Layout.jsx";
import "./contact.css";

/* ------------------------------------------------------------------ */
/*  EMAIL SETUP — READ THIS                                            */
/*  This form sends real email through Web3Forms (free, no backend).  */
/*  1. Go to  https://web3forms.com  and enter aashpawcode@gmail.com   */
/*  2. They email you an Access Key — paste it below.                  */
/*  Until you do, the form runs in DEMO mode (no email is sent).       */
/* ------------------------------------------------------------------ */
const ACCESS_KEY = "873a56c1-3df6-4b25-885d-8553e18084e7";

const LINKS = [
  {
    k: "Email",
    v: "aashpawcode@gmail.com",
    href: "mailto:aashpawcode@gmail.com",
    c: "var(--red)",
  },
  {
    k: "GitHub",
    v: "@AASHPAW1015",
    href: "https://github.com/AASHPAW1015",
    c: "var(--blue)",
  },
  {
    k: "LinkedIn",
    v: "ashutoshkpawar",
    href: "https://www.linkedin.com/in/ashutoshkpawar/",
    c: "var(--green)",
  },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | demo
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Demo mode if the key hasn't been set yet
    if (ACCESS_KEY === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      setStatus("demo");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          from_name: "Portfolio Contact Form",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="page">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <span className="sec-num">04</span>
          <h2 className="sec-title">Get in touch</h2>
        </Reveal>

        <div className="contact-grid">
          {/* Form */}
          <Reveal className="contact-form-wrap">
            <p className="contact-lede">
              Building something, hiring, or just want to talk shop? Drop a
              message — it lands straight in my inbox.
            </p>

            <form className="contact-form" onSubmit={onSubmit}>
              <label className="field">
                <span>Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={update}
                  placeholder="What's on your mind?"
                  required
                />
              </label>

              <button
                className="btn btn-solid send-btn"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message →"}
              </button>

              {status === "success" && (
                <p className="form-msg ok">
                  Sent! I'll get back to you soon. ✓
                </p>
              )}
              {status === "error" && (
                <p className="form-msg err">
                  Something went wrong — email me directly instead.
                </p>
              )}
              {status === "demo" && (
                <p className="form-msg demo">
                  Demo mode — add your Web3Forms access key in{" "}
                  <code>Contact.jsx</code> to send for real.
                </p>
              )}
            </form>
          </Reveal>

          {/* Direct links */}
          <Reveal className="contact-links">
            {LINKS.map((l) => (
              <a
                key={l.k}
                className="contact-card"
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{ "--c": l.c }}
              >
                <span className="cc-k">{l.k}</span>
                <span className="cc-v">{l.v}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </main>
  );
}
