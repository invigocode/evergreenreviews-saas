"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { auditQuestions, auditTips, scoreBand } from "@/lib/audit-quiz";

type Step = "start" | number | "results";

export function ReviewAuditTool() {
  const [step, setStep] = useState<Step>("start");
  const [businessName, setBusinessName] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalScore = useMemo(() => Object.values(answers).reduce((sum, v) => sum + v, 0), [answers]);
  const band = useMemo(() => scoreBand(totalScore), [totalScore]);

  const weakestCategory = useMemo(() => {
    const entries = auditQuestions.map((q) => ({ id: q.id, points: answers[q.id] ?? 0 }));
    entries.sort((a, b) => a.points - b.points);
    return entries[0]?.id;
  }, [answers]);

  const strongestCategory = useMemo(() => {
    const entries = auditQuestions.map((q) => ({ id: q.id, points: answers[q.id] ?? 0 }));
    entries.sort((a, b) => b.points - a.points);
    return entries[0]?.id;
  }, [answers]);

  const selectAnswer = (questionId: string, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
    const currentIndex = typeof step === "number" ? step : 0;
    if (currentIndex < auditQuestions.length - 1) {
      setStep(currentIndex + 1);
    } else {
      setStep("results");
    }
  };

  const questionIndex = typeof step === "number" ? step : 0;
  const currentQuestion = auditQuestions[questionIndex];

  return (
    <Card className="mx-auto max-w-xl overflow-hidden text-left">
      <div className="border-b border-sand-200 bg-evergreen-50/60 px-6 py-3.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-evergreen-800">
          <Sparkles size={13} /> Free Review Health Check
        </p>
      </div>

      <div className="p-6 sm:p-7">
        {step === "start" && (
          <>
            <h2 className="text-xl font-semibold text-ink-900">See how your Google reviews really stack up</h2>
            <p className="mt-1.5 text-[15px] text-ink-500">
              Four quick questions, honest feedback in under a minute — no account needed.
            </p>
            <label className="mt-5 mb-1.5 block text-sm font-medium text-ink-700" htmlFor="audit-business-name">
              Business name (or paste your Google Business Profile link)
            </label>
            <input
              id="audit-business-name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Riverside Roofing Co."
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
            <Button
              size="lg"
              className="mt-4 w-full sm:w-auto"
              disabled={!businessName.trim()}
              onClick={() => setStep(0)}
            >
              Start my free check <ArrowRight size={16} />
            </Button>
          </>
        )}

        {typeof step === "number" && currentQuestion && (
          <>
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-400">
                <span>
                  Question {questionIndex + 1} of {auditQuestions.length}
                </span>
              </div>
              <ProgressBar value={questionIndex + 1} max={auditQuestions.length} />
            </div>

            <h2 className="text-lg font-semibold text-ink-900">{currentQuestion.question}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => selectAnswer(currentQuestion.id, opt.points)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border border-sand-200 px-4 py-3 text-left text-[15px] font-medium text-ink-800 transition-colors",
                    "hover:border-evergreen-400 hover:bg-evergreen-50 cursor-pointer"
                  )}
                >
                  {opt.label}
                  <ArrowRight size={15} className="text-ink-300" />
                </button>
              ))}
            </div>

            {questionIndex > 0 && (
              <button
                type="button"
                onClick={() => setStep(questionIndex - 1)}
                className="mt-4 flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-700 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
          </>
        )}

        {step === "results" && (
          <>
            <div className="flex items-center gap-4">
              <ScoreRing score={totalScore} />
              <div>
                <p className="text-lg font-semibold text-ink-900">{band.headline}</p>
                <p className="text-sm text-ink-500">
                  {businessName || "Your business"} · {band.description}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {strongestCategory && (
                <div className="flex items-start gap-2.5 rounded-xl bg-evergreen-50 p-3.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-evergreen-600" />
                  <p className="text-sm text-evergreen-800">{auditTips[strongestCategory].strength}</p>
                </div>
              )}
              {weakestCategory && (
                <div className="flex items-start gap-2.5 rounded-xl bg-sand-100 p-3.5">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-gold-600" />
                  <p className="text-sm text-ink-700">{auditTips[weakestCategory].tip}</p>
                </div>
              )}

              <div className="relative overflow-hidden rounded-xl border border-dashed border-sand-300 p-3.5">
                <div className="pointer-events-none select-none blur-[3px]" aria-hidden>
                  <p className="text-sm text-ink-700">
                    Two more specific, ranked opportunities based on your answers — with the exact next step for each.
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-white/40 text-xs font-semibold text-ink-500">
                  <Lock size={13} /> Unlock your full action plan
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href="/signup" size="lg" className="flex-1 justify-center">
                Create free account to see full plan
              </ButtonLink>
              <ButtonLink href="/login" variant="secondary" size="lg" className="justify-center">
                See it in the live demo
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function ScoreRing({ score }: { score: number }) {
  const size = 68;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="fill-none stroke-sand-200" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-none stroke-evergreen-500 transition-[stroke-dashoffset] duration-700 ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-base font-bold tabular-nums text-ink-900">
        {score}
      </div>
    </div>
  );
}
