"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Mail, MessageCircle, QrCode, Link2, Lock, AlertTriangle } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { business } from "@/lib/demo-data";
import { industryTemplates, mergeFields, renderPreview } from "@/lib/templates";
import type { CampaignChannel, CampaignTiming } from "@/lib/types";

const channelOptions: { id: CampaignChannel; label: string; icon: typeof Send; available: boolean }[] = [
  { id: "sms", label: "SMS", icon: Send, available: true },
  { id: "email", label: "Email", icon: Mail, available: true },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, available: false },
  { id: "qr", label: "QR code", icon: QrCode, available: true },
  { id: "link", label: "Direct link", icon: Link2, available: true },
];

const timingOptions: { id: CampaignTiming; label: string; description: string }[] = [
  { id: "immediate", label: "Immediately after service", description: "Sent as soon as a job is marked complete." },
  { id: "delayed", label: "After a delay", description: "Wait a set number of hours before sending." },
  { id: "manual", label: "Manual sending", description: "You choose when to send, one at a time." },
  { id: "scheduled", label: "Scheduled sending", description: "Send on a recurring schedule you set." },
];

const audienceOptions = [
  "All completed jobs",
  "Recent customers (last 30 days)",
  "Customers by service type",
  "Custom list I upload",
];

const sampleValues = {
  "[Customer Name]": "Jamie",
  "[Business Name]": business.name,
  "[Service]": "Gutter replacement",
  "[Review Link]": business.googleReviewUrl,
};

export function CampaignBuilder() {
  const [name, setName] = useState("");
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [channel, setChannel] = useState<CampaignChannel>("sms");
  const [timing, setTiming] = useState<CampaignTiming>("delayed");
  const [delayHours, setDelayHours] = useState(24);
  const [templateId, setTemplateId] = useState(industryTemplates[0].id);
  const [message, setMessage] = useState(industryTemplates[0].template);
  const router = useRouter();
  const { show } = useToast();

  const invalidTags = useMemo(() => {
    const found = message.match(/\[[^\]]+\]/g) ?? [];
    return [...new Set(found)].filter((tag) => !mergeFields.includes(tag));
  }, [message]);

  const preview = useMemo(() => renderPreview(message, sampleValues), [message]);

  const insertField = (field: string) => setMessage((prev) => `${prev}${prev.endsWith("\n") || !prev ? "" : " "}${field}`);

  const save = (status: "draft" | "active") => {
    show(status === "active" ? `“${name || "Untitled campaign"}” is live.` : "Campaign saved as a draft.");
    router.push("/dashboard/campaigns");
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-5">
        <Card className="p-5">
          <CardTitle>Campaign details</CardTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Campaign name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Post-Service Follow-up"
                className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Target customer group</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
              >
                {audienceOptions.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Request channel</CardTitle>
          <CardDescription className="mt-0.5">Only channels connected to your account can be selected.</CardDescription>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {channelOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                disabled={!opt.available}
                onClick={() => setChannel(opt.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors",
                  !opt.available && "cursor-not-allowed opacity-45",
                  opt.available && channel === opt.id
                    ? "border-evergreen-600 bg-evergreen-50 text-evergreen-800"
                    : opt.available && "border-sand-200 text-ink-600 hover:border-sand-300 cursor-pointer"
                )}
              >
                {opt.available ? <opt.icon size={18} /> : <Lock size={15} />}
                {opt.label}
                {!opt.available && <span className="text-[10px] text-ink-400">Not connected</span>}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Timing</CardTitle>
          <div className="mt-4 flex flex-col gap-2">
            {timingOptions.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                  timing === opt.id ? "border-evergreen-500 bg-evergreen-50" : "border-sand-200 hover:border-sand-300"
                )}
              >
                <input
                  type="radio"
                  name="timing"
                  className="mt-1 accent-evergreen-700"
                  checked={timing === opt.id}
                  onChange={() => setTiming(opt.id)}
                />
                <span>
                  <span className="block text-sm font-medium text-ink-800">{opt.label}</span>
                  <span className="block text-xs text-ink-500">{opt.description}</span>
                </span>
              </label>
            ))}
            {timing === "delayed" && (
              <div className="ml-7 mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={168}
                  value={delayHours}
                  onChange={(e) => setDelayHours(Number(e.target.value))}
                  className="w-20 rounded-lg border border-sand-300 px-2.5 py-1.5 text-sm focus:border-evergreen-500 focus:outline-none"
                />
                <span className="text-sm text-ink-500">hours after service completion</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Message</CardTitle>
              <CardDescription className="mt-0.5">Start from an industry template, then make it your own.</CardDescription>
            </div>
            <select
              value={templateId}
              onChange={(e) => {
                const t = industryTemplates.find((x) => x.id === e.target.value)!;
                setTemplateId(t.id);
                setMessage(t.template);
              }}
              className="rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-sm focus:border-evergreen-500 focus:outline-none"
            >
              {industryTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {mergeFields.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => insertField(f)}
                className="rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-xs font-medium text-ink-600 hover:border-evergreen-400 hover:text-evergreen-700 cursor-pointer"
              >
                + {f}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            className="mt-3 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
          />

          {invalidTags.length > 0 && (
            <div className="mt-2 flex items-start gap-2 rounded-lg bg-warning-50 px-3 py-2 text-xs text-warning-600">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              {invalidTags.join(", ")} {invalidTags.length === 1 ? "isn't" : "aren't"} a recognised merge field and
              won&apos;t be replaced automatically.
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => save("draft")}>
            Save as draft
          </Button>
          <Button onClick={() => save("active")} disabled={!name.trim()}>
            Activate campaign
          </Button>
        </div>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <Card className="p-5">
          <CardTitle>Live preview</CardTitle>
          <CardDescription className="mt-0.5">How this message will look to {sampleValues["[Customer Name]"]}.</CardDescription>
          <div className="mt-4 rounded-xl border border-sand-200 bg-sand-50 p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-800">{preview}</p>
          </div>
          <dl className="mt-4 space-y-1.5 text-xs text-ink-500">
            <div className="flex justify-between">
              <dt>Channel</dt>
              <dd className="font-medium text-ink-700">{channelOptions.find((c) => c.id === channel)?.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Timing</dt>
              <dd className="font-medium text-ink-700">{timingOptions.find((t) => t.id === timing)?.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Audience</dt>
              <dd className="text-right font-medium text-ink-700">{audience}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
