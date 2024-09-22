"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOGIN_URL } from "@/config/routes";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useMutateForgotPassword } from "@/hooks/mutations/useMutateForgotPassword";

// Form validation schema
const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function UserForgotPassword() {
  const { isPending, handleForgotPassword } = useMutateForgotPassword();

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission to call forget password api
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleForgotPassword(data)

  }

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
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            loading={isPending}
            loadingText="Submitting..."
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
