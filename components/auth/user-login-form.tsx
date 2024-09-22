"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FORGOT_PASSWORD_URL, HOME_URL } from "@/config/routes";
import Link from "next/link";

// Form validation schema
const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function UserLoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isSocialLoading, setIsSocialLoading] = React.useState(false);

  const router = useRouter();

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission and call NextAuth signIn for credentials
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false, // prevent automatic redirect
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);
    if (result?.error) {
      // Show error using toast or set local error state
      toast.error(result.error);
    } else {
      // Redirect to the home page on successful sign-in
      toast.success("Login Successfully, Redirecting shortly...");
      router.push(HOME_URL);  // Redirect user to the home page
    }
  }

  // Handle Google sign-in
  // async function handleGoogleSignIn() {
  //   setIsSocialLoading(true);
  //   try {
  //     const result = await signIn("google", {
  //       redirect: false,
  //       callbackUrl: HOME_URL,
  //     });

  //     if (!result) {
  //       toast.error("Failed to get response from Google sign-in. Please try again.");
  //       return;
  //     }

  //     if (result.error) {
  //       if (result.error.startsWith("OAuthAccountNotLinked:")) {
  //         toast.error(result.error.split(":")[1]);
  //       } else {
  //         toast.error(`Google sign-in failed: ${result.error}`);
  //       }
  //     } else if (result.ok) {
  //       toast.success("Google login successful, redirecting...");
  //       router.push(result.url || HOME_URL);
  //     } else {
  //       toast.info("Google sign-in is in progress...");
  //     }
  //   } catch (error) {
  //     console.error("Google sign-in error:", error);
  //     toast.error("An unexpected error occurred. Please try again later.");
  //   } finally {
  //     setIsSocialLoading(false);
  //   }
  // }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*************"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link href={FORGOT_PASSWORD_URL} className="text-xs underline my-2 hover:text-blue-700">
            Forgot your password?
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            loading={isLoading}
            loadingText="Submitting..."
          >
            Login
          </Button>
        </form>
      </Form>

      {/* Divider for alternative logins */}
      {/* <div className="relative pt-3">
        <div className="absolute inset-0 flex items-center pt-3">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}

      {/* Social Login Buttons */}
      {/* <div className="flex pt-3 w-full gap-4 mx-auto justify-center">
        <Button
          onClick={handleGoogleSignIn}
          className="gap-2 w-full"
          loading={isSocialLoading}
          loadingText="Signing in..."
          variant={"outline"}
        >
          <MailPlus />
          <span>Gmail</span>
        </Button>
      </div> */}
    </div>
  );
}
