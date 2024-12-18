import {
  getCurrentChallenge,
  getRandomChallenge,
  setCurrentChallenge,
} from "@/actions/challenges";
import AppLayout from "@/components/Applayout";
import ChallengeView from "@/components/ChallengeView";

export default async function ChallengePage() {
  let challenge = await getCurrentChallenge();

  if (!challenge) {
    challenge = await getRandomChallenge();
    if (challenge) {
      await setCurrentChallenge(challenge.id);
    }
  }

  if (!challenge) {
    return (
      <AppLayout pageTitle="Challenge" showBackButton={true}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-xl">No challenges available at the moment.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      pageTitle="Challenge"
      footerButtonText="Completed?"
      footerButtonAction="submit-challenge"
    >
      <ChallengeView challenge={challenge} />
    </AppLayout>
  );
}
