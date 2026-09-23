"use client";

import { useState } from "react";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";

const initialTeam = [
  { name: "Dana Whitfield", email: "dana@oakandstoneservices.com", role: "Owner" },
  { name: "Miguel Ortega", email: "miguel@oakandstoneservices.com", role: "Manager" },
  { name: "Sasha Lee", email: "sasha@oakandstoneservices.com", role: "Team member" },
];

export function TeamTab() {
  const [team, setTeam] = useState(initialTeam);
  const [email, setEmail] = useState("");
  const { show } = useToast();

  const invite = () => {
    if (!email.trim()) return;
    setTeam((prev) => [...prev, { name: email.split("@")[0], email, role: "Team member" }]);
    setEmail("");
    show(`Invitation sent to ${email}.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-5">
        <CardTitle>Invite a team member</CardTitle>
        <CardDescription className="mt-0.5">They&apos;ll be able to manage reviews and campaigns.</CardDescription>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="teammate@business.com"
            className="flex-1 rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
          />
          <Button onClick={invite}>
            <UserPlus size={15} /> Send invite
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="p-5 pb-0">
          <CardTitle>Team members</CardTitle>
        </div>
        <div className="mt-3 flex flex-col">
          {team.map((member) => (
            <div key={member.email} className="flex items-center justify-between gap-3 border-t border-sand-100 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <Avatar name={member.name} size={34} />
                <div>
                  <p className="text-sm font-medium text-ink-800">{member.name}</p>
                  <p className="text-xs text-ink-400">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={member.role === "Owner" ? "green" : "neutral"}>{member.role}</Badge>
                <button className="flex h-7 w-7 items-center justify-center rounded-md text-ink-400 hover:bg-sand-100 cursor-pointer" aria-label="Team member options">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
