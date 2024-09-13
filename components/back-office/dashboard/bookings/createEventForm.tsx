'use client';

import { isValid, parseISO } from 'date-fns';
import React from 'react';
import { z } from 'zod';
import FormTemplate from '@/components/common/back-office/formTemplate';
import { useCreateEvent } from '@/hooks/mutations/useCreateEvent';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  date: z.string().refine(date => isValid(parseISO(date)), { message: "Invalid date" }),
  time: z.string().min(1, { message: "Time is required" }),
});

const fields = [
  { name: 'title', type: 'text', label: 'Title', placeholder: 'Enter title' },
  { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description' },
  { name: 'address', type: 'textarea', label: 'Address', placeholder: 'Enter address' },
  { name: 'date', type: 'date', label: 'Date' },
  { name: 'time', type: 'time', label: 'Time' },
  { name: 'image', type: 'file', label: 'Upload Image', accept: 'image/*' }, // Accept only images
];

export default function CreateEventForm() {
  const { isPending, handleCreateEvent } = useCreateEvent();

  const handleSubmit = (formData: any) => {
    // Call the mutation to create the event
    handleCreateEvent(formData);
  };

  return (
    <FormTemplate
      isPending={isPending}
      schema={formSchema}
      fields={fields}
      heading={"Event Ticket Form"}
      defaultValues={{
        title: '',
        description: '',
        address: '',
        date: '',
        time: ''
      }}
      onSubmit={handleSubmit}
    />
  );
}
