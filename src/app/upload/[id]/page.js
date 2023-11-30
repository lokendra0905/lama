"use client";

import { Upload } from "@/components/uploads";
import { Sidebar } from "@/layouts/Sidebar";

export default function Page({ params }) {
  return (
    <Sidebar projectId={params?.id}>
      <Upload id={params?.id} />
    </Sidebar>
  );
}
