"use client";

import { useEffect, useState } from "react";
import { leadsDb, invoicesDb, projectsDb, tendersDb } from "@/lib/database";

export interface DashboardNotification {
  id: string;
  title: string;
  time: string;
  unread: boolean;
  href: string;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 60) return "just now";
  if (min < 60) return `${min} min ago`;
  if (hr < 24) return `${hr} hr ago`;
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}

/**
 * Derives real-time notifications from the database:
 *  - New leads in last 7 days
 *  - Overdue invoices
 *  - Project deadlines within 7 days
 *  - Tender deadlines within 14 days
 */
export function useDashboardNotifications() {
  const [items, setItems] = useState<DashboardNotification[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [leads, invoices, projects, tenders] = await Promise.all([
          leadsDb.getAll().catch(() => []),
          invoicesDb.getAll().catch(() => []),
          projectsDb.getAll().catch(() => []),
          tendersDb.getAll().catch(() => []),
        ]);

        if (cancelled) return;

        const now = Date.now();
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        const sevenDaysAhead = now + 7 * 24 * 60 * 60 * 1000;
        const fourteenDaysAhead = now + 14 * 24 * 60 * 60 * 1000;

        const out: DashboardNotification[] = [];

        leads
          .filter((l) => new Date(l.created_at).getTime() >= sevenDaysAgo)
          .slice(0, 5)
          .forEach((l) =>
            out.push({
              id: `lead-${l.id}`,
              title: `New lead: ${l.name}${l.company ? ` (${l.company})` : ""}`,
              time: relativeTime(l.created_at),
              unread: l.status === "new",
              href: "/dashboard/crm",
            })
          );

        invoices
          .filter((i) => {
            if (i.status === "paid") return false;
            if (!i.due_date) return false;
            return new Date(i.due_date).getTime() < now;
          })
          .slice(0, 5)
          .forEach((i) =>
            out.push({
              id: `invoice-${i.id}`,
              title: `Overdue invoice: ${i.invoice_number} — ${i.client_name}`,
              time: `due ${new Date(i.due_date).toLocaleDateString()}`,
              unread: true,
              href: "/dashboard/invoices",
            })
          );

        projects
          .filter((p) => {
            if (p.status === "completed") return false;
            if (!p.deadline) return false;
            const t = new Date(p.deadline).getTime();
            return t >= now && t <= sevenDaysAhead;
          })
          .slice(0, 5)
          .forEach((p) =>
            out.push({
              id: `project-${p.id}`,
              title: `Deadline soon: ${p.name}`,
              time: new Date(p.deadline).toLocaleDateString(),
              unread: false,
              href: "/dashboard/projects",
            })
          );

        tenders
          .filter((t) => {
            if (["won", "lost", "submitted"].includes(t.status)) return false;
            if (!t.deadline) return false;
            const time = new Date(t.deadline).getTime();
            return time >= now && time <= fourteenDaysAhead;
          })
          .slice(0, 5)
          .forEach((t) =>
            out.push({
              id: `tender-${t.id}`,
              title: `Tender closing: ${t.title}`,
              time: new Date(t.deadline).toLocaleDateString(),
              unread: false,
              href: "/dashboard/tenders",
            })
          );

        setItems(out.slice(0, 10));
      } catch {
        if (!cancelled) setItems([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return items;
}
