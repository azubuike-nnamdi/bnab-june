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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Fade } from "react-awesome-reveal"
import { useCreateZones } from "@/hooks/mutations/useMutateCreateZone"

const FormSchema = z.object({
  range: z.string().min(1, {
    message: "Range must be specified.",
  }),
  cost: z.string().min(1, {
    message: "Cost must be specified.",
  }),
  zone: z.enum(["zone 1", "zone 2", "zone 3"], {
    errorMap: () => ({ message: "Please select a valid zone." }),
  }),
})

export default function ZoneFormCreation() {

  const { isPending, handleCreateZone } = useCreateZones();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      range: "",
      cost: "",
      zone: "zone 1",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleCreateZone(data)
    console.log('data', data)
  }

  return (
    <Fade direction="up" cascade triggerOnce className="px-5">
      <h1 className="sm:text-3xl text-xl font-medium text-white sm:mb-8 mb-4 my-5">Provide your details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Range</FormLabel>
                <FormControl>
                  <Input placeholder="Enter range" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zone 1">Zone 1</SelectItem>
                      <SelectItem value="zone 2">Zone 2</SelectItem>
                      <SelectItem value="zone 3">Zone 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-white"
            loadingText="Submitting..."
            loading={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </Fade>
  )
}
