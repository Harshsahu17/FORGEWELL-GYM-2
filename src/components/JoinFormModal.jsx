import { useEffect, useRef, useState } from 'react';
import defaultData from '../data/forgewellData.json';
import { Check, X } from './icons';

const BENEFITS = [
  'Certified coaches guiding every session',
  'Personalized programming that adapts to you',
  'Flexible plans for every stage of training',
  'Progress tracked and reviewed monthly',
];

export default function JoinFormModal({ isOpen, initialMembership = '', onClose }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const [membership, setMembership] = useState(initialMembership);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesError, setServicesError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    setMembership(initialMembership || '');
    if (isOpen) {
      formRef.current?.reset();
      setMembership(initialMembership || '');
      setSelectedServices([]);
      setServicesError('');
      setSubmitted(false);
    }
  }, [initialMembership, isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleDialogClick = (event) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  const toggleService = (service) => {
    setServicesError('');
    setSelectedServices((current) => (
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    ));
  };

  const handleSubmit = (event) => {
    if (selectedServices.length === 0) {
      event.preventDefault();
      setServicesError('Please select at least one service.');
      return;
    }

    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      className="join-modal"
      aria-labelledby="join-modal-heading"
      onClose={onClose}
      onClick={handleDialogClick}
    >
      <div className="join-modal-layout grid lg:grid-cols-[0.86fr_1.14fr]">
        <aside className="flex flex-col bg-ink-primary p-7 text-white sm:p-10 lg:p-12">
          <div>
            <span className="inline-block font-mono text-xs font-bold tracking-[0.25em] text-accent uppercase">
              MEMBERSHIP ENQUIRY
            </span>
            <h2 id="join-modal-heading" className="mt-5 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl">
              <span className="block">JOIN</span>
              <span className="block text-accent">FORGEWELL</span>
            </h2>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-slate-300 sm:text-base">
              Tell us how you want to train and we will help you choose a membership that fits your goals.
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 font-body text-sm leading-relaxed text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Check size={12} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-7 sm:pt-10">
            {defaultData.hero.stats?.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-extrabold text-accent sm:text-3xl">{stat.value}</div>
                <div className="mt-1 font-body text-[10px] font-semibold uppercase tracking-wide text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </aside>

        <div className="bg-bg-card p-5 sm:p-10 lg:max-h-[92vh] lg:overflow-y-auto">
          {submitted ? (
            <div className="flex min-h-[620px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check size={32} />
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold text-ink-primary">Membership enquiry received</h3>
              <p className="mt-3 max-w-md font-body text-base leading-relaxed text-ink-secondary">
                Thanks for sharing your details. Your membership preferences have been submitted successfully.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-accent px-6 py-3.5 font-body text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
          <div className="mb-7 flex items-start justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink-primary sm:text-3xl">Tell us about you</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-secondary">
                We will use these details to prepare your membership enquiry.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 rounded-xl p-2 text-ink-secondary transition hover:bg-bg-secondary hover:text-ink-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="Close membership enquiry form"
            >
              <X size={22} />
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="join-name" className="font-body text-sm font-bold text-ink-primary">Full name</label>
                <input
                  id="join-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none placeholder:text-ink-secondary/70 transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label htmlFor="join-email" className="font-body text-sm font-bold text-ink-primary">Email address</label>
                <input
                  id="join-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none placeholder:text-ink-secondary/70 transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label htmlFor="join-phone" className="font-body text-sm font-bold text-ink-primary">Phone number</label>
                <input
                  id="join-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none placeholder:text-ink-secondary/70 transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="font-body text-sm font-bold text-ink-primary">Gender</legend>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((option) => (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-bg-primary px-3 py-2.5 font-body text-sm font-semibold text-ink-secondary transition focus-within:ring-2 focus-within:ring-accent/30 has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-accent"
                    >
                      <input type="radio" name="gender" value={option} className="accent-accent" />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="join-membership" className="font-body text-sm font-bold text-ink-primary">Select plan</label>
                <select
                  id="join-membership"
                  name="membership"
                  value={membership}
                  onChange={(event) => setMembership(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="" disabled>Choose a plan</option>
                  {defaultData.pricing.tiers?.map((tier) => (
                    <option key={tier.name} value={tier.name}>{tier.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="join-date" className="font-body text-sm font-bold text-ink-primary">Preferred joining date</label>
                <input
                  id="join-date"
                  name="joiningDate"
                  type="date"
                  min={today}
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="font-body text-sm font-bold text-ink-primary">Interested services</legend>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                  {defaultData.services.items?.map((service) => {
                    const isSelected = selectedServices.includes(service.title);
                    return (
                      <label
                        key={service.title}
                        className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 font-body text-sm transition focus-within:ring-2 focus-within:ring-accent/30 ${
                          isSelected
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border bg-bg-primary text-ink-secondary hover:border-accent/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service.title}
                          checked={isSelected}
                          onChange={() => toggleService(service.title)}
                          className="h-4 w-4 accent-accent"
                        />
                        <span>{service.title}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 font-body text-xs font-medium text-ink-secondary" aria-live="polite">
                  {servicesError || 'Choose as many as apply.'}
                </p>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="join-message" className="font-body text-sm font-bold text-ink-primary">
                  Anything else we should know? <span className="font-normal text-ink-secondary">(optional)</span>
                </label>
                <textarea
                  id="join-message"
                  name="message"
                  rows="3"
                  placeholder="Share a goal, question or note"
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-bg-primary px-4 py-3 font-body text-base text-ink-primary outline-none placeholder:text-ink-secondary/70 transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 font-body text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2"
            >
              Submit Membership Enquiry
            </button>
          </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
