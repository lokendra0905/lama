"use client";
import { Project } from "@/components/project";
import { MainLayout } from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Project />
    </MainLayout>
  );
}
