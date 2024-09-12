'use client';

import { DataTable } from "@/components/common/dataTable";
import useUsers from "@/hooks/useUsers"

export function UserTable() {
  const { isPending, data } = useUsers();
  const userData = data?.data ?? [];
  const headers = [
    "Full Name",
    "Email",
  ];

  const mappedUserData = (data: any[]) => {
    return data.map(user => ({
      "Full Name": user.name,
      "Email": user.email,
    }));
  };
  return (
    <main>
      <DataTable
        caption="All User Record"
        headers={headers}
        data={userData}
        isPending={isPending}
        mapData={mappedUserData}
      />
    </main>
  )
}