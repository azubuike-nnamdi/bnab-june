'use client';

import { DataTable } from "@/components/common/dataTable";
import useContact from "@/hooks/useContact"

export default function ContactInfoTable() {
  const { isPending, data } = useContact()

  const contactData = data?.data || []

  const headers = ["fullName", "email", "phoneNumber", "subject", "message",];

  return (
    <main>
      <DataTable
        caption="Contact Information"
        headers={headers}
        data={contactData}
        isPending={isPending}
      />
    </main>
  )
}