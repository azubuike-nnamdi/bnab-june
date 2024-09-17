'use client'

import ThankYou from "../common/thankYou";


export default function ThankYouClient({ sanitizedReference }: Readonly<{ sanitizedReference: string }>) {
  return <ThankYou reference={sanitizedReference} />;
}