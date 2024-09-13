'use client';

import React from 'react';
import { z } from 'zod';
import FormTemplate from '@/components/common/back-office/formTemplate';
import { useCreateRides } from '@/hooks/mutations/useCreateRides';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  passenger: z.string().min(1, { message: "passenger number is required" }),
  luggage: z.string().min(1, { message: "luggage number is required" }),
});

const fields = [
  { name: 'title', type: 'text', label: 'Vehicle Type', placeholder: 'Enter Vehicle Type' },
  { name: 'description', type: 'textarea', label: 'Vehicle Description', placeholder: 'Enter vehicle description' },
  { name: 'passenger', type: 'number', label: 'Passenger Number', placeholder: 'Enter Passenger Number' },
  { name: 'luggage', type: 'number', label: 'Passenger Luggage', placeholder: 'Enter Luggage Number' },
  { name: 'image', type: 'file', label: 'Upload Image', accept: 'image/*' }, // Accept only images
];

export default function CreateRideForm() {
  const { isPending, handleCreateRides } = useCreateRides();

  const handleSubmit = (formData: any) => {
    // Call the mutation to create the event
    handleCreateRides(formData);
  };

  return (
    <FormTemplate
      isPending={isPending}
      schema={formSchema}
      fields={fields}
      heading={"Dedicated Ride Form"}
      defaultValues={{
        title: '',
        description: '',
        passenger: '',
        luggage: '',
      }}
      onSubmit={handleSubmit}
    />
  );
}
