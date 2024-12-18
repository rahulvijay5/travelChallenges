import NotAuthenticated from "@/components/NotAuthenticated";
import { adminMails } from "@/lib/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Page",
  description: "Admin page for authorised persons only.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) return <NotAuthenticated />;

  if (adminMails.includes(user.email!)) {
    console.log("User is authenticated and authorised to go ahead!");
    return <>{children}</>;
  } else {
    console.log("Not Authorised to visit this page");
    redirect("/home");
  }
}
