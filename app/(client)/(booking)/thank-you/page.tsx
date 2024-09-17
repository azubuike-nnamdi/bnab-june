'use client'

import { useSearchParams } from "next/navigation";
import ThankYou from "@/components/common/thankYou";
import { sanitize } from "@/lib/helper";

//checks if the sanitized versions of trxref and reference are equal.
const validateReferences = (trxref: string | null, reference: string | null): boolean => {
  if (!trxref || !reference) return false;
  return sanitize(trxref) === sanitize(reference);
};

// const getPaymentStatus = (isValid: boolean): 'success' | 'failure' => {
//   // TODO: Replace this with actual payment status verification
//   return isValid ? 'success' : 'failure';
// };

export default function Page() {
  const searchParams = useSearchParams();
  const trxref = searchParams.get('trxref');
  const reference = searchParams.get('reference');

  const isValid = validateReferences(trxref, reference);
  // const paymentStatus = getPaymentStatus(isValid);

  const sanitizedReference = reference ? sanitize(reference) : "";

  if (!isValid) {
    console.error("Invalid or mismatched transaction reference");
    // TODO: Handle invalid reference (e.g., redirect or show error message)
  }

  // TODO: Query transaction using IPN to confirm payment status

  return <ThankYou reference={sanitizedReference} />;
}