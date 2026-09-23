"use client";

import { useRef } from "react";
import { Download, Trash2, Monitor, ShieldCheck } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";

const sessions = [
  { device: "Chrome on macOS", location: "Portland, OR", current: true },
  { device: "Evergreen Reviews app · iPhone", location: "Portland, OR", current: false },
];

export function PrivacyTab() {
  const { show } = useToast();
  const deleteDialog = useRef<DialogHandle>(null);

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-5">
        <CardTitle>Your data</CardTitle>
        <CardDescription className="mt-0.5">Export or permanently remove your business data.</CardDescription>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={() => show("We'll email you a full data export shortly.")}>
            <Download size={15} /> Export my data
          </Button>
          <Button variant="danger" onClick={() => deleteDialog.current?.show()}>
            <Trash2 size={15} /> Delete account
          </Button>
        </div>
        <p className="mt-3 text-xs text-ink-400">
          Deleting your account removes your business profile, customer records, and review history from Evergreen
          Reviews. It does not delete reviews already published on Google.
        </p>
      </Card>

      <Card className="p-5">
        <CardTitle>Data retention</CardTitle>
        <CardDescription className="mt-0.5">How long we keep customer records used for review requests.</CardDescription>
        <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-sand-50 p-3.5 text-sm text-ink-600">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-evergreen-600" />
          Customer contact details are retained for 24 months after their last request, then automatically removed.
          You can delete any customer&apos;s record earlier from the Customers page.
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="p-5 pb-0">
          <CardTitle>Active sessions</CardTitle>
        </div>
        <div className="mt-3 flex flex-col">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-3 border-t border-sand-100 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <Monitor size={18} className="text-ink-400" />
                <div>
                  <p className="text-sm font-medium text-ink-800">
                    {s.device} {s.current && <span className="text-evergreen-600">· This device</span>}
                  </p>
                  <p className="text-xs text-ink-400">{s.location}</p>
                </div>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" onClick={() => show("Session signed out.")}>
                  Sign out
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Dialog ref={deleteDialog} title="Delete your account?" description="This action can't be undone.">
        <p className="text-sm text-ink-600">
          This will permanently remove your business profile, customers, campaigns, and review history from
          Evergreen Reviews. Reviews already published on Google will remain untouched.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => deleteDialog.current?.close()}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteDialog.current?.close();
              show("This is a demo account, so deletion is disabled.");
            }}
          >
            Delete account
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
