import ThankYouClient from "@/components/thank-you/thankYouClient";
import { validateReferences, sanitize } from "@/lib/helper";

export const dynamic = 'force-dynamic'

export default function ThankYouPage({ searchParams }: Readonly<{ searchParams: { trxref?: string, reference?: string } }>) {
  const trxref = searchParams.trxref ?? null;
  const reference = searchParams.reference ?? null;

  const isValid = validateReferences(trxref, reference);
  const sanitizedReference = reference ? sanitize(reference) : "";

  if (!isValid) {
    console.error("Invalid or mismatched transaction reference");
    // TODO: Handle invalid reference (e.g., redirect or show error message)
  }

  // TODO: Query transaction using IPN to confirm payment status (this should be done server-side)

  return <ThankYouClient sanitizedReference={sanitizedReference} />;
}