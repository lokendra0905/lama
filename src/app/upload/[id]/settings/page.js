"use client";

import { AccountSettings } from "@/components/accountSettings";
import { Sidebar } from "@/layouts/Sidebar";

export default function Page({ params }) {
  return (
    <Sidebar projectId={params.id}>
      <AccountSettings />
    </Sidebar>
  );
}
