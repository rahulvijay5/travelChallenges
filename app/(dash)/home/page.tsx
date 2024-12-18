import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Applayout";
import Ripple from "@/components/ui/ripple";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <AppLayout pageTitle="Home">
      <div className="flex flex-col items-center justify-center min-h-[calc(90vh-4rem)]">
        <Link href="/challenge">
          <Button size="lg" className="text-3xl p-8 py-20 rounded-lg">
            Bring Up a Challenge
          </Button>
        </Link>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </AppLayout>
  );
}
