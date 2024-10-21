'use client'

import ReusablePaymentMethod from "@/components/common/reusablePaymentMethod";
import { useCheckoutContext } from "@/context/checkoutContext"
import { useSaveTransaction } from "@/hooks/mutations/useSaveTransaction";
import { useSubmitTransaction } from "@/hooks/mutations/useSubmitTransaction";
import { CheckoutPageProps } from "@/types/declaration";
import { CreditCard } from "lucide-react";

export default function Page({ params }: Readonly<CheckoutPageProps>) {

  const transactionType = params.id
  const { checkout } = useCheckoutContext();
  const { handleSubmitTransaction, isPending } = useSubmitTransaction(transactionType);
  const { handleSaveTransaction, isPending: isSavingTransaction } = useSaveTransaction();

  const handlePaymentSelect = (method: string) => {
    console.log('Selected payment method:', method);
  };

  const formData = checkout;
  const handleSubmitPayment = async (selectedMethod: string) => {

    if (selectedMethod === 'Pay Later') {
      if (formData) {
        handleSubmitTransaction(formData);
      }
    } else {
      // toast.warning('Feature not available at the moment');
      handleSaveTransaction(formData as any)
    }

  };
  return (
    <main>
      <ReusablePaymentMethod
        paymentMethods={paymentMethods}
        onPaymentSelect={handlePaymentSelect}
        onSubmitPayment={handleSubmitPayment}
        formData={formData}
        loading={isPending || isSavingTransaction}
        loadingText="Processing..."
        transactionType={transactionType}
      />
    </main>
  )
}



const paymentMethods = [
  { id: 1, method: 'Credit Card', icon: <CreditCard /> },
  { id: 2, method: 'Mobile Money', icon: <CreditCard /> },
  { id: 3, method: 'Pay Later', icon: <CreditCard /> },
];