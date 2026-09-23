"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Search, Send, Mail, MessageCircle, QrCode, Link2, User, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { cn, formatDate } from "@/lib/utils";
import { requestStatusConfig, methodLabels } from "@/lib/status";
import type { Customer, ReviewRequest, RequestMethod } from "@/lib/types";
import { business } from "@/lib/demo-data";

const channelOptions: { id: RequestMethod; label: string; icon: typeof Send; available: boolean }[] = [
  { id: "sms", label: "SMS", icon: Send, available: true },
  { id: "email", label: "Email", icon: Mail, available: true },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, available: false },
  { id: "manual", label: "Manual", icon: User, available: true },
  { id: "qr", label: "QR code", icon: QrCode, available: true },
  { id: "link", label: "Direct link", icon: Link2, available: true },
];

export function RequestsClient({
  requests: initialRequests,
  customers,
}: {
  requests: ReviewRequest[];
  customers: Customer[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const dialogRef = useRef<DialogHandle>(null);
  const { show } = useToast();

  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id ?? "");
  const [channel, setChannel] = useState<RequestMethod>("sms");
  const [message, setMessage] = useState(defaultMessage(customers[0]?.name ?? "Customer"));

  const total = requests.length;
  const delivered = requests.filter((r) => ["delivered", "clicked", "completed"].includes(r.status)).length;
  const clicked = requests.filter((r) => r.clicked).length;
  const completed = requests.filter((r) => r.completed).length;
  const conversionRate = total ? Math.round((completed / total) * 100) : 0;

  const filtered = useMemo(() => {
    return requests
      .filter((r) => (statusFilter === "all" ? true : r.status === statusFilter))
      .filter((r) => r.customerName.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.dateRequested).getTime() - new Date(a.dateRequested).getTime());
  }, [requests, statusFilter, search]);

  const openDialog = () => dialogRef.current?.show();

  const sendRequest = () => {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (!customer) return;
    const newRequest: ReviewRequest = {
      id: `req_new_${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      dateRequested: new Date().toISOString(),
      method: channel,
      status: channel === "manual" || channel === "qr" ? "sent" : "scheduled",
      clicked: false,
      completed: false,
    };
    setRequests((prev) => [newRequest, ...prev]);
    dialogRef.current?.close();
    show(`Review request queued for ${customer.name}.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total requests" value={total.toString()} icon={<Send size={16} />} accent="green" />
        <MetricCard label="Delivered" value={delivered.toString()} deltaLabel={`${total ? Math.round((delivered / total) * 100) : 0}% of requests`} />
        <MetricCard label="Clicked" value={clicked.toString()} deltaLabel="Opened the review link" helpText="Clicking the link doesn't guarantee a review was submitted." />
        <MetricCard label="Completed" value={completed.toString()} deltaLabel={`${conversionRate}% conversion`} accent="green" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer…"
              className="w-full rounded-lg border border-sand-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-sand-300 bg-white px-2.5 py-2 text-sm text-ink-700 focus:border-evergreen-500 focus:outline-none"
          >
            <option value="all">All statuses</option>
            {Object.entries(requestStatusConfig).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={openDialog}>
          <Plus size={16} /> Create Review Request
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Send size={20} />}
          title="No review requests yet"
          description="Once you send your first request, you'll be able to track delivery, clicks, and completed reviews here."
          action={
            <Button onClick={openDialog}>
              <Plus size={16} /> Create your first request
            </Button>
          }
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50 text-left text-xs font-medium uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Link clicked</th>
                  <th className="px-4 py-3">Review attributed</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-sand-100 last:border-0 hover:bg-sand-50/70">
                    <td className="px-4 py-3 font-medium text-ink-800">{r.customerName}</td>
                    <td className="px-4 py-3 text-ink-500">{formatDate(r.dateRequested)}</td>
                    <td className="px-4 py-3 text-ink-600">{methodLabels[r.method]}</td>
                    <td className="px-4 py-3 text-ink-600">{r.campaignName ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge tone={requestStatusConfig[r.status].tone}>{requestStatusConfig[r.status].label}</Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{r.clicked ? "Yes" : "—"}</td>
                    <td className="px-4 py-3 text-ink-600">{r.completed ? "Yes" : "Not confirmed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Dialog ref={dialogRef} title="Create a review request" description="Send a personal, well-timed request to one customer.">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Customer</label>
            <select
              value={selectedCustomer}
              onChange={(e) => {
                setSelectedCustomer(e.target.value);
                const c = customers.find((x) => x.id === e.target.value);
                if (c) setMessage(defaultMessage(c.name));
              }}
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Send via</label>
            <div className="grid grid-cols-3 gap-2">
              {channelOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  disabled={!opt.available}
                  onClick={() => setChannel(opt.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors",
                    !opt.available && "cursor-not-allowed opacity-45",
                    opt.available && channel === opt.id
                      ? "border-evergreen-600 bg-evergreen-50 text-evergreen-800"
                      : opt.available && "border-sand-200 text-ink-600 hover:border-sand-300 cursor-pointer"
                  )}
                >
                  {opt.available ? <opt.icon size={16} /> : <Lock size={14} />}
                  {opt.label}
                  {!opt.available && <span className="text-[10px] text-ink-400">Not connected</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
            <p className="mt-1.5 text-xs text-ink-400">
              [Review Link] will be replaced with your Google review link: {business.googleReviewUrl}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => dialogRef.current?.close()}>
              Cancel
            </Button>
            <Button type="button" onClick={sendRequest}>
              Send request
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function defaultMessage(customerName: string) {
  return `Hi ${customerName},\n\nThank you again for choosing ${business.name}. We hope you're happy with the work we completed.\n\nIf you have a moment, we'd really appreciate hearing about your experience — it helps other customers know what to expect from us.\n\nYou can share your experience here: [Review Link]\n\nThank you for your support.\n${business.name}`;
}
