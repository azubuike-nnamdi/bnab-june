'use client'

import ReusablePaymentMethod from "@/components/common/reusablePaymentMethod";
import { useCheckoutContext } from "@/context/checkoutContext"
import { useSubmitTransaction } from "@/hooks/mutations/useSubmitTransaction";
import { CheckoutPageProps } from "@/types/declaration";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function Page({ params }: Readonly<CheckoutPageProps>) {

  const transactionType = params.id
  const { checkout } = useCheckoutContext();
  const { handleSubmitTransaction, isPending } = useSubmitTransaction(transactionType);

  const handlePaymentSelect = (method: string) => {
    console.log('Selected payment method:', method);
  };

  const formData = checkout;
  const handleSubmitPayment = async (selectedMethod: string) => {
    if (selectedMethod === 'Buy Now, Pay Later') {
      toast.warning('Kindly note that, payment validates booking. Booking expires in 4 hours')
      if (formData) {
        handleSubmitTransaction(formData);
      }
    } else {
      toast.warning('Feature not available at the moment');
    }

  };
  return (
    <main>
      <ReusablePaymentMethod
        paymentMethods={paymentMethods}
        onPaymentSelect={handlePaymentSelect}
        onSubmitPayment={handleSubmitPayment}
        formData={formData}
        loading={isPending}
        loadingText="Processing..."
      />
    </main>
  )
}



const paymentMethods = [
  { id: 1, method: 'Credit Card', icon: <CreditCard /> },
  { id: 2, method: 'Mobile Money', icon: <CreditCard /> },
  { id: 3, method: 'Buy Now, Pay Later', icon: <CreditCard /> },
];