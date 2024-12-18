"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/api/getuser");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.log("User not found, when calling hook! redirected to Home!");
        redirect("/");
      }
    }
    fetchUser();
  }, []);

  return user;
}
