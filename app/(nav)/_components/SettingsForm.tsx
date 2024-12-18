// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "@/hooks/use-toast";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { updateUserSettings } from "@/actions/user";

// const settingsFormSchema = z.object({
//   username: z.string().min(3).max(20),
//   bio: z.string().max(160).optional(),
//   email: z.string().email(),
//   notifications: z.boolean(),
// });

// type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// export default function SettingsForm() {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<SettingsFormValues>({
//     resolver: zodResolver(settingsFormSchema),
//     defaultValues: {
//       username: "",
//       bio: "",
//       email: "",
//       notifications: true,
//     },
//   });

//   async function onSubmit(data: SettingsFormValues) {
//     setIsLoading(true);
//     try {
//       await updateUserSettings(data);
//       toast({
//         title: "Settings updated",
//         description: "Your settings have been updated successfully.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update settings. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <h1 className="text-2xl font-bold mb-6">User Settings</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="username" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="email@example.com" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   We'll use this email to contact you.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="bio"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Bio</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Tell us a little bit about yourself"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   You can @mention other users and organizations to link to
//                   them.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="notifications"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-base">
//                     Receive notifications
//                   </FormLabel>
//                   <FormDescription>
//                     Receive email notifications when there's activity on your
//                     account.
//                   </FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update settings"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
import React from "react";

const CheckBackLatterSomeDay = () => {
  return <div className="flex-center">Check Back Latter Some Day</div>;
};

export default CheckBackLatterSomeDay;
