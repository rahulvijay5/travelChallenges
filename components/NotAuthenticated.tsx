"use client";
import React from "react";
import { Button } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const NotAuthenticated = () => {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1>You are not authenticated to view this page!</h1>
      <div className="w-lg flex items-center gap-2">
        Either
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>
        or
        <Button>
          <RegisterLink>Sign up</RegisterLink>
        </Button>
        first!!
      </div>
    </main>
  );
};

export default NotAuthenticated;
