'use client'

import Loading from "@/components/common/loader";
import ThankYou from "@/components/common/thankYou";
import useQueryTransaction from "@/hooks/useQueryTransaction";
import { validateReferences, sanitize } from "@/lib/helper";
import { toast } from "sonner";

export const dynamic = 'force-dynamic'

export default function ThankYouPage({ searchParams }: Readonly<{ searchParams: { trxref?: string, reference?: string } }>) {
  // const trxref = searchParams.trxref ?? null;
  const reference = searchParams.reference ?? null;

  // const isValid = validateReferences(trxref, reference);
  const sanitizedReference = reference ? sanitize(reference) : "";
  const { isPending, data } = useQueryTransaction(sanitizedReference);

  // if (!isValid) {
  //   toast.error('We are unable to complete your request, please contact administrator!');
  //   return null;
  // }


  if (isPending) return <Loading />;

  return <ThankYou transactionData={data} />;
}
