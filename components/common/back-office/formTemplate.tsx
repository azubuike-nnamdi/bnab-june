'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DynamicFormField {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  step?: string;
  accept?: string; // For file inputs, e.g., "image/*"
}

interface ReusableFormProps {
  isPending: boolean;
  heading: string;
  schema: z.ZodSchema;
  fields: DynamicFormField[];
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => void;
}

export default function FormTemplate({
  isPending,
  heading,
  schema,
  fields,
  defaultValues = {},
  onSubmit,
}: Readonly<ReusableFormProps>) {
  const [base64Image, setBase64Image] = React.useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const { handleSubmit, control, formState } = form;
  const isFormValid = formState.isValid;

  // Handle file change, validate file type, and convert to Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      // Check if the file type is PNG, JPG, or SVG
      if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(selectedFile.type)) {
        toast.error('Invalid file type. Only PNG, JPG, and SVG files are allowed.');
        setBase64Image(null); // Reset the image state if the type is invalid
        return;
      }

      // Convert file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string); // Set Base64 string
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setBase64Image(null); // Reset if no file is selected
    }
  };

  const handleFormSubmit = (data: any) => {
    const formData = {
      ...data,
      base64Image, // Include the Base64 image in the form data
    };

    onSubmit(formData);
  };

  // Function to render form fields based on field type
  const renderField = (field: DynamicFormField) => {
    const { type, placeholder, step, accept } = field;

    switch (type) {
      case 'textarea':
        return <Textarea placeholder={placeholder} {...form.register(field.name)} />;
      case 'file':
        return <Input type="file" accept={accept} onChange={handleFileChange} />;
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            step={step}
            {...form.register(field.name)}
          />
        );
    }
  };

  return (
    <div className="container sm:p-4 p-4 mx-auto my-5">
      <h3 className="mb-4 sm:text-3xl text-xl sm:font-bold font-medium">
        {heading}
      </h3>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={() => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {renderField(field)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            loading={isPending}
            loadingText="Submitting..."
            className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
