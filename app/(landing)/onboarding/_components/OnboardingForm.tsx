"use client";

import * as z from "zod";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnboardingSchema } from "@/lib/zod-schema";
import { MultiSelect } from "@/components/MultiSelect";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { preferenceOptions, challengeTypeOptions } from "@/lib/constants";

const OnboardingForm = () => {
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [checkingUsername, setCheckingUsername] = useState(false);
  const router = useRouter();
  const { user } = useKindeBrowserClient();

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      username: "",
      city: "",
      preferences: [],
      challengeTypes: [],
    },
  });

  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (username.length < 4) {
        setUsernameAvailable(null);
        return;
      }
      setCheckingUsername(true);
      try {
        const response = await fetch(
          `/api/check-username?username=${username}`
        );
        const data = await response.json();
        setUsernameAvailable(data.available);
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameAvailable(null);
      }
      setCheckingUsername(false);
    }, 1200),
    []
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "username") {
        checkUsernameAvailability(value.username ? value.username : "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form, checkUsernameAvailability]);

  async function onSubmit(values: z.infer<typeof OnboardingSchema>) {
    setLoading(true);
    const response = await fetch("/api/auth/success", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (response.ok) {
      router.push("/home");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input placeholder="cooluser123" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => checkUsernameAvailability(field.value)}
                  disabled={field.value.length < 4 || checkingUsername}
                >
                  Check
                </Button>
              </div>
              {checkingUsername && (
                <p className="text-sm text-muted-foreground">
                  Checking username...
                </p>
              )}
              {usernameAvailable === true && (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckIcon className="w-4 h-4 mr-1" />
                  Username is available
                </p>
              )}
              {usernameAvailable === false && (
                <p className="text-sm text-red-600">
                  Username is already taken. Please choose another.
                </p>
              )}
              <FormDescription>
                Choose a unique username for your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Delhi" {...field} />
              </FormControl>
              <FormDescription>Enter the city you live in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  options={preferenceOptions}
                  selectedOptions={field.value}
                  onChange={field.onChange}
                  label="Preferences"
                  description="Select your travel preferences"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="challengeTypes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  options={challengeTypeOptions}
                  selectedOptions={field.value}
                  onChange={field.onChange}
                  label="Challenge Types"
                  description="Select the types of challenges you're interested in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || usernameAvailable === false}
        >
          {loading ? (
            <>
              Getting your profile ready
              <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
