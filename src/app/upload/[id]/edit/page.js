"use client";

import { EditUpload } from "@/components/uploads/EditUpload";
import { Sidebar } from "@/layouts/Sidebar";

export default function Page({ params }) {
  return (
    <Sidebar projectId={params.id}>
      <EditUpload id={params?.id} />
    </Sidebar>
  );
}
