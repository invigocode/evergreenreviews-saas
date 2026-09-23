"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { completeOnboarding } from "@/lib/auth";

const STEPS = [
  "Welcome",
  "Business details",
  "Google profile",
  "Current reputation",
  "Goals",
  "First action",
];

const GOALS = [
  "Get more genuine customer reviews",
  "Improve review-request consistency",
  "Monitor review growth",
  "Improve response times",
  "Organise review campaigns",
  "Improve Google Business Profile performance",
];

type BusinessDetails = {
  businessName: string;
  category: string;
  website: string;
  location: string;
  employeeCount: string;
};

const initialDetails: BusinessDetails = {
  businessName: "",
  category: "Home & Property Maintenance",
  website: "",
  location: "",
  employeeCount: "Just me",
};

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [goals, setGoals] = useState<string[]>([GOALS[0], GOALS[2]]);
  const [details, setDetails] = useState<BusinessDetails>(initialDetails);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const updateDetail = (key: keyof BusinessDetails, value: string) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  const toggleGoal = (goal: string) =>
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));

  const finish = (destination: "campaign" | "dashboard") => {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("businessName", details.businessName);
      formData.set("category", details.category);
      formData.set("website", details.website);
      formData.set("address", details.location);
      formData.set("employeeCount", details.employeeCount);

      const result = await completeOnboarding(undefined, formData);
      if (result?.error) {
        setError(result.error);
        setStep(1);
        return;
      }
      if (destination === "campaign") router.push("/dashboard/campaigns/new");
    });
  };

  return (
    <div className="animate-rise">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-ink-700">{STEPS[step]}</span>
          <span className="text-ink-400">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <ProgressBar value={step + 1} max={STEPS.length} />
      </div>

      {step === 0 && (
        <Card className="p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-evergreen-50 text-evergreen-700">
            <Sparkles size={26} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
            Let&apos;s build a stronger reputation for your business.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
            Evergreen Reviews helps you turn more genuine customer experiences into valuable Google
            reviews through simple, well-timed systems.
          </p>
          <Button size="lg" className="mt-7" onClick={next}>
            Get started <ArrowRight size={16} />
          </Button>
          <p className="mt-4 text-xs text-ink-400">Takes about 3 minutes · No credit card required</p>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink-900">Tell us about your business</h2>
          <p className="mt-1 text-sm text-ink-500">This helps us tailor templates and defaults for you.</p>
          {error && (
            <p role="alert" className="mt-3 text-sm font-medium text-error-600">
              {error}
            </p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              label="Business name"
              placeholder="e.g. Riverside Roofing Co."
              value={details.businessName}
              onChange={(v) => updateDetail("businessName", v)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Business category</label>
              <select
                className={inputClass}
                value={details.category}
                onChange={(e) => updateDetail("category", e.target.value)}
              >
                <option>Home & Property Maintenance</option>
                <option>Roofing</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Cleaning</option>
                <option>Landscaping</option>
                <option>Salon & Barber</option>
                <option>Café</option>
                <option>Hotel</option>
                <option>Other service business</option>
              </select>
            </div>
            <Field
              label="Website"
              placeholder="yourbusiness.com"
              value={details.website}
              onChange={(v) => updateDetail("website", v)}
            />
            <Field
              label="Business location"
              placeholder="City, State"
              value={details.location}
              onChange={(v) => updateDetail("location", v)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Team size</label>
              <select
                className={inputClass}
                value={details.employeeCount}
                onChange={(e) => updateDetail("employeeCount", e.target.value)}
              >
                <option>Just me</option>
                <option>2–5 employees</option>
                <option>6–11 employees</option>
                <option>12–20 employees</option>
                <option>21+ employees</option>
              </select>
            </div>
          </div>
          <StepNav onBack={back} onNext={next} nextDisabled={!details.businessName.trim()} />
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink-900">Connect your Google Business Profile</h2>
          <p className="mt-1 text-sm text-ink-500">
            We use Google&apos;s official, secure sign-in — Evergreen Reviews never sees your Google password.
          </p>

          {!connected ? (
            <div className="mt-6 rounded-xl border border-dashed border-sand-300 bg-sand-50 p-6 text-center">
              <ShieldCheck className="mx-auto mb-3 text-evergreen-600" size={28} />
              <p className="text-sm text-ink-600">
                Live Google Business Profile syncing isn&apos;t connected yet for your account, so this step is
                a preview of how it will work once it&apos;s available.
              </p>
              <Button
                className="mt-4"
                type="button"
                disabled={connecting}
                onClick={() => {
                  setConnecting(true);
                  setTimeout(() => {
                    setConnecting(false);
                    setConnected(true);
                  }, 1100);
                }}
              >
                {connecting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Connecting…
                  </>
                ) : (
                  "Preview the Google connection"
                )}
              </Button>
            </div>
          ) : (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-evergreen-200 bg-evergreen-50 p-5">
              <CheckCircle2 className="mt-0.5 shrink-0 text-evergreen-600" size={22} />
              <div>
                <p className="text-sm font-semibold text-evergreen-800">This is a preview, not a live connection</p>
                <p className="mt-1 text-sm text-evergreen-700">
                  When Google Business Profile syncing is enabled for your account, your real review count and
                  rating will appear here automatically.
                </p>
              </div>
            </div>
          )}

          <StepNav onBack={back} onNext={next} nextDisabled={!connected} skip={() => next()} />
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink-900">Your current reputation</h2>
          <p className="mt-1 text-sm text-ink-500">
            A few details to help us set a baseline — you can refine these later.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Current Google review count" placeholder="e.g. 42" />
            <Field label="Current average rating" placeholder="e.g. 4.6" />
            <Field label="Google Business Profile URL" placeholder="https://g.page/r/…" className="sm:col-span-2" />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Current review-request method</label>
              <select className={inputClass} defaultValue="Ask in person, occasionally">
                <option>We don&apos;t currently ask</option>
                <option>Ask in person, occasionally</option>
                <option>Manual text or email</option>
                <option>Printed cards / QR codes</option>
                <option>Another software tool</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Customers served monthly</label>
              <select className={inputClass} defaultValue="20–50">
                <option>Under 20</option>
                <option>20–50</option>
                <option>50–100</option>
                <option>100–250</option>
                <option>250+</option>
              </select>
            </div>
          </div>
          <StepNav onBack={back} onNext={next} />
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-ink-900">What matters most to you?</h2>
          <p className="mt-1 text-sm text-ink-500">Choose as many as apply — you can change this later in Settings.</p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {GOALS.map((goal) => {
              const active = goals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border p-3.5 text-left text-sm transition-colors cursor-pointer",
                    active
                      ? "border-evergreen-500 bg-evergreen-50 text-evergreen-800"
                      : "border-sand-200 bg-white text-ink-700 hover:border-sand-300"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                      active ? "border-evergreen-600 bg-evergreen-600 text-white" : "border-sand-300"
                    )}
                  >
                    {active && <CheckCircle2 size={12} />}
                  </span>
                  {goal}
                </button>
              );
            })}
          </div>
          <StepNav onBack={back} onNext={next} />
        </Card>
      )}

      {step === 5 && (
        <Card className="p-6 sm:p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
            <TrendingUp size={26} />
          </div>
          <h2 className="text-xl font-semibold text-ink-900">You&apos;re set up. Let&apos;s get your first reviews.</h2>
          <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink-500">
            The fastest way to see results is to create your first review-request campaign — it takes about
            two minutes.
          </p>

          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-1 rounded-xl bg-sand-100 p-4">
            <Star className="fill-gold-500 text-gold-500" size={18} />
            <Star className="fill-gold-500 text-gold-500" size={18} />
            <Star className="fill-gold-500 text-gold-500" size={18} />
            <Star className="fill-gold-500 text-gold-500" size={18} />
            <Star className="fill-gold-500 text-gold-500" size={18} />
            <span className="ml-2 text-sm font-medium text-ink-600">Small, consistent actions build lasting trust.</span>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-error-600">
              {error}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => finish("campaign")} disabled={pending}>
              {pending ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              Create my first campaign
            </Button>
            <Button size="lg" variant="secondary" onClick={() => finish("dashboard")} disabled={pending}>
              Go to my dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100";

function Field({
  label,
  value,
  defaultValue,
  placeholder,
  onChange,
  className,
}: {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <input
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={inputClass}
      />
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  skip,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  skip?: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-sand-200 pt-5">
      <Button variant="ghost" onClick={onBack} type="button">
        <ArrowLeft size={16} /> Back
      </Button>
      <div className="flex items-center gap-3">
        {skip && nextDisabled && (
          <button type="button" onClick={skip} className="text-sm font-medium text-ink-500 hover:text-ink-700 cursor-pointer">
            Skip for now
          </button>
        )}
        <Button onClick={onNext} type="button" disabled={nextDisabled}>
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
