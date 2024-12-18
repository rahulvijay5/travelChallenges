import React from "react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const userIsAuthenticated = await isAuthenticated();
  return (
    <div className="flex items-center gap-10 justify-center min-h-screen">
      {userIsAuthenticated ? (
        redirect("/home")
      ) : (
        // <LogoutLink>Logout</LogoutLink>
        <div className="w-lg flex gap-4">
          <Button>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
