import React, { useState } from 'react';
import { api } from '../api.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
        <div className="section-header">
          <span className="section-tag">get in touch</span>
          <h2 className="section-title">Contact <span className="highlight">me</span></h2>
          <p className="section-sub">Have an opportunity? Let's connect and build something together.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let's talk</h3>
            <p>I'm currently open to internship opportunities, collaborative projects, and learning experiences. Feel free to reach out.</p>

            <div className="contact-items">
              <a href="mailto:aryansobdh@gmail.com" className="contact-item">
                <span className="ci-icon">@</span>
                <div className="ci-text">
                  <span className="ci-label">Email</span>
                  <span className="ci-value">aryansobdh@gmail.com</span>
                </div>
              </a>
              <a href="tel:+918602879043" className="contact-item">
                <span className="ci-icon">#</span>
                <div className="ci-text">
                  <span className="ci-label">Phone</span>
                  <span className="ci-value">+91 8602879043</span>
                </div>
              </a>
              <a href="https://github.com/datsaryan" target="_blank" rel="noreferrer" className="contact-item">
                <span className="ci-icon">gh</span>
                <div className="ci-text">
                  <span className="ci-label">GitHub</span>
                  <span className="ci-value">github.com/datsaryan</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" placeholder="John Doe"
                         value={form.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your email</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com"
                         value={form.email} onChange={onChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="Internship opportunity / collaboration"
                       value={form.subject} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Hi Aryan, I'd love to connect about..."
                          value={form.message} onChange={onChange} required />
              </div>

              {status && <p className={`form-status ${status.type}`}>{status.text}</p>}

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
