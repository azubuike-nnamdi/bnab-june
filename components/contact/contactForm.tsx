
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Fade } from "react-awesome-reveal"
import { useSubmitContact } from "@/hooks/mutations/useSubmitContact"

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {

  const { isPending, handleSubmitContact } = useSubmitContact();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmitContact(data)
    console.log('data', data)
  }

  return (
    <Fade direction="up" cascade triggerOnce>
      <h1 className="sm:text-3xl text-xl font-medium text-gray-800 sm:mb-8 mb-4">Leave us your info</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Full Name</span>
                  <span className="text-red-500"> *</span>

                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Email</span>
                  <span className="text-red-500"> *</span>

                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Phone Number</span>
                  <span className="text-red-500"> *</span>

                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Subject</span>
                  <span className="text-red-500"> *</span>

                </FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Message</span>
                  <span className="text-red-500"> *</span>

                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            loadingText="Submitting..."
            loading={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </Fade>
  )
}
