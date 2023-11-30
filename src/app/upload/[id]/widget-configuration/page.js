"use client";

import { WidgetConfiguration } from "@/components/uploads/widgetConfiguration";
import { Sidebar } from "@/layouts/Sidebar";

export default function Page({ params }) {
  return (
    <Sidebar projectId={params.id}>
      <WidgetConfiguration id={params?.id} />
    </Sidebar>
  );
}
