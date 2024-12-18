"use client";
import { redirect, useRouter } from "next/navigation";
import AppLayout from "@/components/Applayout";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const router = useRouter();
  return (
    <AppLayout pageTitle="Admin" showBackButton={false}>
      <div className="flex items-center justify-center">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full items-center justify-center">
          <Button
            className="w-full md:py-16"
            onClick={() => router.push("/admin/new-challenge")}
          >
            Add a new task
          </Button>
          <Button
            className="w-full md:py-16"
            variant="outline"
            onClick={() => router.push("/admin/analytics")}
          >
            Analytics
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
