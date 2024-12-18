import { getUserProfile } from "@/actions/user";
import AppLayout from "@/components/Applayout";
import ProfileView from "../_components/ProfileView";

export default async function ProfilePage() {
  const userProfile = await getUserProfile();

  return (
    <AppLayout pageTitle="Profile">
      <ProfileView userProfile={userProfile} />
    </AppLayout>
  );
}
