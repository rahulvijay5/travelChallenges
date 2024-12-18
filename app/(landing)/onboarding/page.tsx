import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { searchUserByExternalId } from "@/actions/user";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";

export default async function OnboardingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }

  const userExists = await searchUserByExternalId(user.id);

  if (userExists) {
    redirect("/home");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Complete Your Profile
      </h1>
      <OnboardingForm />
    </div>
  );
}
