import { getChallenge, getCompletedChallenges } from "@/actions/challenges";
import AppLayout from "@/components/Applayout";
import CompletedChallengeView from "../../_components/CompletedChallengeView";

export default async function CompletedChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const challenge = await getChallenge(params.id);
  const completedChallenges = await getCompletedChallenges(params.id);

  if (completedChallenges.length === 0) {
    return (
      <AppLayout pageTitle="Completed Challenges">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-xl">
            No completed challenges found for this task.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      pageTitle="Completed Challenges"  
    >
      <CompletedChallengeView
        challenge={challenge}
        completedChallenges={completedChallenges}
      />
    </AppLayout>
  );
}
