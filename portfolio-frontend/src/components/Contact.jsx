import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';
import Reveal from './Reveal.jsx';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const wrapRef = useRef(null);
  const [split, setSplit] = useState(false);

  // The two console cards start overlapped at dead center (see CSS) and
  // animate apart into their final grid positions whenever this section
  // is in view, and back together when it scrolls out of view — so
  // scrolling back up replays the "merge" in reverse.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setSplit(true);
      return undefined;
    }
    const el = wrapRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setSplit(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await api.submitContact(form);
      setStatus({ type: 'success', text: res.message || 'Message sent!' });
      setForm(EMPTY);
    } catch (err) {
      const fieldErrors = err.body && typeof err.body === 'object' ? Object.values(err.body) : [];
      setStatus({
        type: 'error',
        text: fieldErrors.length ? fieldErrors.join(' ') : err.message || 'Something went wrong. Try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">say hi</span>
            <h2 className="section-title">Let's <span className="highlight">chat</span></h2>
            <p className="section-sub">Got something cool in mind? A role, a project, or just want to nerd out about code — I'm in.</p>
          </div>
        </Reveal>

        <div className={`contact-wrapper${split ? ' is-split' : ''}`} ref={wrapRef}>
          <span className="contact-split-flash" aria-hidden="true" />

          <div className="contact-info">
            <h3>Drop me a line</h3>
            <p>Open to internships, side projects, or just a good "hey, want to build something?" message. No formal intro required — I usually reply pretty fast.</p>

            <div className="hero-console contact-console">
              <div className="console-titlebar">
                <span className="console-dot red" />
                <span className="console-dot yellow" />
                <span className="console-dot green" />
                <span className="console-path">contact.json</span>
              </div>
              <div className="console-body">
                <span className="console-req">GET /api/contact</span>
                <span className="json-punc">{'{'}</span>
                <a href="mailto:aryansobdh@gmail.com" className="console-field">
                  <span className="json-key">"email"</span><span className="json-punc">: </span>
                  <span className="json-str">"aryansobdh@gmail.com"</span><span className="json-punc">,</span>
                </a>
                <a href="tel:+918602879043" className="console-field">
                  <span className="json-key">"phone"</span><span className="json-punc">: </span>
                  <span className="json-str">"+91 8602879043"</span><span className="json-punc">,</span>
                </a>
                <a href="https://github.com/datsaryan" target="_blank" rel="noreferrer" className="console-field">
                  <span className="json-key">"github"</span><span className="json-punc">: </span>
                  <span className="json-str">"github.com/datsaryan"</span>
                </a>
                <span className="json-punc">{'}'}</span>
                <span className="console-cursor" />
              </div>
            </div>
          </div>

          <div className="contact-form-wrap hero-console">
            <div className="console-titlebar">
              <span className="console-dot red" />
              <span className="console-dot yellow" />
              <span className="console-dot green" />
              <span className="console-path">message.json</span>
            </div>
            <form className="contact-form console-form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">name</label>
                  <input id="name" name="name" type="text" placeholder="John Doe"
                         value={form.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com"
                         value={form.email} onChange={onChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">subject</label>
                <input id="subject" name="subject" type="text" placeholder="Internship opportunity / collaboration"
                       value={form.subject} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">message</label>
                <textarea id="message" name="message" rows="5" placeholder="Hi Aryan, I'd love to connect about..."
                          value={form.message} onChange={onChange} required />
              </div>

              {status && <p className={`form-status ${status.type}`}>{status.text}</p>}

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send it over 🚀'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
