import NotAuthenticated from "@/components/NotAuthenticated";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// export const metadata = {
//   title: "Travel Challenges",
//   description: "",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();
  const userIsAuthenticated = await isAuthenticated();
  return <main>{userIsAuthenticated ? children : <NotAuthenticated />}</main>;
}
