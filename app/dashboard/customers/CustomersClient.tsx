"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Search, ShieldCheck, Send, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { customerRequestStatusConfig } from "@/lib/status";
import type { Customer } from "@/lib/types";

export function CustomersClient({ customers: initial }: { customers: Customer[] }) {
  const [customers, setCustomers] = useState(initial);
  const [search, setSearch] = useState("");
  const dialogRef = useRef<DialogHandle>(null);
  const { show } = useToast();

  const filtered = useMemo(
    () => customers.filter((c) => `${c.name} ${c.service}`.toLowerCase().includes(search.toLowerCase())),
    [customers, search]
  );

  const sendRequest = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, requestStatus: "sent", lastRequestDate: new Date().toISOString() } : c))
    );
    const customer = customers.find((c) => c.id === id);
    show(`Review request sent to ${customer?.name}.`);
  };

  const addCustomer = (formData: FormData) => {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    const newCustomer: Customer = {
      id: `cust_new_${Date.now()}`,
      name,
      email: String(formData.get("email") ?? "") || undefined,
      phone: String(formData.get("phone") ?? "") || undefined,
      service: String(formData.get("service") ?? "General service"),
      serviceDate: String(formData.get("serviceDate") ?? new Date().toISOString().slice(0, 10)),
      requestStatus: "not_sent",
      consent: formData.get("consent") === "on",
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    dialogRef.current?.close();
    show(`${name} added to your customer list.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers…"
            className="w-full rounded-lg border border-sand-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
          />
        </div>
        <Button onClick={() => dialogRef.current?.show()}>
          <Plus size={16} /> Add Customer
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-sand-200 bg-sand-50 text-left text-xs font-medium uppercase tracking-wide text-ink-500">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Service date</th>
                <th className="px-4 py-3">Last request</th>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-sand-100 last:border-0 hover:bg-sand-50/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={c.name} size={30} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-800">{c.name}</p>
                        <p className="truncate text-xs text-ink-400">{c.email ?? c.phone ?? "No contact on file"}</p>
                      </div>
                      {!c.consent && (
                        <span title="No consent on file for review requests">
                          <Info size={13} className="shrink-0 text-warning-600" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{c.service}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(c.serviceDate)}</td>
                  <td className="px-4 py-3 text-ink-500">{c.lastRequestDate ? formatDate(c.lastRequestDate) : "—"}</td>
                  <td className="px-4 py-3 text-ink-600">{c.campaignName ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={customerRequestStatusConfig[c.requestStatus].tone}>
                      {customerRequestStatusConfig[c.requestStatus].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant={c.requestStatus === "not_sent" ? "secondary" : "ghost"}
                      disabled={c.requestStatus !== "not_sent" || !c.consent}
                      onClick={() => sendRequest(c.id)}
                      title={
                        c.requestStatus !== "not_sent"
                          ? "A request was already sent — we avoid asking twice."
                          : !c.consent
                          ? "No consent on file for review requests"
                          : undefined
                      }
                    >
                      <Send size={12} /> {c.requestStatus === "not_sent" ? "Send request" : "Already asked"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="flex items-start gap-3 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-evergreen-600" />
        <p className="text-sm text-ink-600">
          We only send one review request per customer to respect their time — you can see this reflected in the
          Status column above. Manage data retention, exports, and deletion in{" "}
          <span className="font-medium text-ink-800">Settings → Privacy &amp; Security</span>.
        </p>
      </Card>

      <Dialog ref={dialogRef} title="Add a customer" description="Add someone you've recently served.">
        <form action={addCustomer} className="flex flex-col gap-4">
          <Field label="Name" name="name" required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Service provided" name="service" defaultValue="General maintenance" />
            <Field label="Service date" name="serviceDate" type="date" />
          </div>
          <label className="flex items-start gap-2.5 text-sm text-ink-600">
            <input type="checkbox" name="consent" defaultChecked className="mt-0.5 accent-evergreen-700" />
            This customer has agreed to be contacted about their experience.
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => dialogRef.current?.close()}>
              Cancel
            </Button>
            <Button type="submit">Add customer</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
      />
    </div>
  );
}
