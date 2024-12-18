"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { redirect, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LogOut,
  User,
  CheckSquare,
  SkipForward,
  Settings,
  Moon,
  Sun,
  DiamondPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useTheme } from "next-themes";

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showBackButton?: boolean;
  footerButtonAction?: string;
  footerButtonText?: string;
  footerButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  pageTitle,
  showBackButton,
  footerButtonAction,
  footerButtonText,
  footerButtonVariant = "default",
}) => {
  const router = useRouter();
  const handleFooterButtonClick = () => {
    if (footerButtonAction === "submit-challenge") {
      router.push("/challenge/complete");
    } else if (footerButtonAction === "bring-new-challenge") {
      router.push("/home");
    }
  };
  const { user } = useKindeBrowserClient();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background border-b flex items-center justify-center mt-2 w-full">
        <div className=" flex items-center justify-between max-w-screen-lg  h-14 w-full px-4">
          <div className="flex items-center">
            {showBackButton && <BackButton showtext={false} />}
            {pageTitle && (
              <h1 className="text-lg font-semibold">{pageTitle}</h1>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative border h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.picture || ""}
                    alt={user?.given_name || ""}
                  />
                  <AvatarFallback>{user?.given_name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 space-y-2"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-medium">
                <div className="flex flex-col space-y-1 py-2">
                  <p className="text-sm font-medium leading-none">
                    {user?.given_name} {user?.family_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/home" className="text-orange-500">
                  <DiamondPlus className="mr-2 h-4 w-4" />
                  <span>New Challenge</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/completed-tasks">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  <span>Completed Tasks</span>
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/skipped-tasks">
                  <SkipForward className="mr-2 h-4 w-4" />
                  <span>Skipped Tasks</span>
                </Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                <span>Toggle Theme</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutLink className="flex gap-2 text-orange-500">
                  <LogOut className="h-4 w-4" />
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow py-6">{children}</main>

      {/* Footer button (mobile only) */}
      {footerButtonAction && footerButtonText && (
        <footer className="sticky bottom-0 z-50 bg-background border-t p-4 flex items-center justify-center">
          <Button
            variant={footerButtonVariant}
            onClick={handleFooterButtonClick}
            className="w-full max-w-2xl"
          >
            {footerButtonText}
          </Button>
        </footer>
      )}
    </div>
  );
};

export default AppLayout;
