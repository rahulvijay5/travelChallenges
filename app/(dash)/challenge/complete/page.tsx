import { getCurrentChallenge } from "@/actions/challenges";
import AppLayout from "@/components/Applayout";
import ChallengeCompletionForm from "../_components/ChallengeCompleteForm";

export default async function ChallengeCompletionPage() {
  const challenge = await getCurrentChallenge();

  if (!challenge) {
    return (
      <AppLayout pageTitle="Complete Challenge">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-xl">No active challenge found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout pageTitle="Complete Challenge">
      <ChallengeCompletionForm challenge={challenge} />
    </AppLayout>
  );
}
