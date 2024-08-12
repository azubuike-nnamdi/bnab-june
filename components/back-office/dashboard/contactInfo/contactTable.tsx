'use client';

import { DataTable } from "@/components/common/dataTable";
import useContact from "@/hooks/useContact"
import { Contact } from "@/types/declaration";

export default function ContactInfoTable() {
  const { isPending, data } = useContact()

  const contactData = data?.data || []
  const formatContactData = (contacts: Contact[]) => {
    return contacts.map(contact => {
      const createdAt = new Date(contact.createdAt);
      return {
        ...contact,
        createdDate: createdAt.toLocaleDateString(),
        createdTime: createdAt.toLocaleTimeString(),
      };
    });
  };

  const formattedContactData = formatContactData(contactData);
  const headers = ["fullName", "email", "phoneNumber", "subject", "message", "createdDate", "createdTime",];

  return (
    <main>
      <DataTable
        caption="Contact Form Records"
        headers={headers}
        data={formattedContactData}
        isPending={isPending}
      />
    </main>
  )
}