"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Printer, QrCode as QrCodeIcon } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { business } from "@/lib/demo-data";

const cardTemplates = [
  { id: "evergreen", label: "Evergreen", fit: "Service businesses", bg: "bg-evergreen-800", text: "text-white", sub: "text-evergreen-200", qrBg: "#ffffff", qrFg: "#147b28" },
  { id: "sand", label: "Warm neutral", fit: "Cafés & retail", bg: "bg-sand-100", text: "text-ink-900", sub: "text-evergreen-700", qrBg: "#ffffff", qrFg: "#1c2320" },
  { id: "midnight", label: "Midnight gold", fit: "Salons & hotels", bg: "bg-ink-900", text: "text-white", sub: "text-gold-300", qrBg: "#ffffff", qrFg: "#1c2320" },
] as const;

export function MaterialsClient() {
  const [templateId, setTemplateId] = useState<(typeof cardTemplates)[number]["id"]>("evergreen");
  const [cta, setCta] = useState("Loved working with us? A quick review means the world.");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const { show } = useToast();
  const template = cardTemplates.find((t) => t.id === templateId)!;

  useEffect(() => {
    QRCode.toDataURL(business.googleReviewUrl, {
      width: 400,
      margin: 1,
      color: { dark: template.qrFg, light: template.qrBg },
    }).then(setQrDataUrl);
  }, [template.qrFg, template.qrBg]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${business.name.replace(/\s+/g, "-").toLowerCase()}-review-qr.png`;
    link.click();
    show("QR code downloaded.");
  };

  const printCard = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-5">
        <Card className="p-5">
          <CardTitle>Card template</CardTitle>
          <CardDescription className="mt-0.5">Pick a style that fits how customers will see it.</CardDescription>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {cardTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-colors cursor-pointer",
                  templateId === t.id ? "border-evergreen-600" : "border-transparent"
                )}
              >
                <div className={cn("h-14 w-full rounded-lg", t.bg)} />
                <span className="text-xs font-medium text-ink-700">{t.label}</span>
                <span className="text-[11px] text-ink-400">{t.fit}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Call to action</CardTitle>
          <CardDescription className="mt-0.5">Keep it short, warm, and specific — not needy.</CardDescription>
          <textarea
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            rows={3}
            maxLength={90}
            className="mt-3 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
          />
          <p className="mt-1 text-right text-xs text-ink-400">{cta.length}/90</p>
        </Card>

        <Card className="p-5">
          <CardTitle>Staff guidance</CardTitle>
          <CardDescription className="mt-0.5">A short reminder for anyone handing this card to a customer.</CardDescription>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li>· Offer it after a genuinely positive moment — a job well done, a happy handoff.</li>
            <li>· Let the customer decide; never ask more than once for the same job.</li>
            <li>· Never offer a discount or incentive in exchange for a review.</li>
            <li>· If a customer seems unhappy, address that directly instead of asking for a review.</li>
          </ul>
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
        <Card className="p-5">
          <CardTitle>Preview</CardTitle>
          <div className="mt-4 flex justify-center">
            <div
              ref={cardRef}
              id="printable-review-card"
              className={cn("flex w-72 flex-col items-center gap-4 rounded-2xl p-7 text-center shadow-card", template.bg, template.text)}
            >
              <p className="text-sm font-semibold tracking-tight">{business.name}</p>
              {qrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- locally generated data URL, not an optimizable remote asset
                <img src={qrDataUrl} alt="QR code linking to Google review page" width={168} height={168} className="rounded-lg" />
              )}
              <p className="text-[13px] leading-snug">{cta}</p>
              <p className={cn("text-[11px] uppercase tracking-wide", template.sub)}>Scan to leave a Google review</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button onClick={downloadQr}>
              <Download size={15} /> Download QR code (PNG)
            </Button>
            <Button variant="secondary" onClick={printCard}>
              <Printer size={15} /> Print this card
            </Button>
          </div>
        </Card>

        <Card className="flex items-start gap-3 p-4">
          <QrCodeIcon size={16} className="mt-0.5 shrink-0 text-ink-400" />
          <p className="text-xs leading-relaxed text-ink-500">
            More formats — table tents, window decals, and personalised print-on-demand cards — are coming soon.
            Today you can download the QR code or print this card directly from your browser.
          </p>
        </Card>
      </div>
    </div>
  );
}
