import { useSubmitTicket } from "@/hooks/mutations/useSubmitTicket";


interface TicketSummaryProps {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
}

export default function TicketSummary({ formData }: Readonly<TicketSummaryProps>) {

  const { handleSubmitTicket, isPending } = useSubmitTicket();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleSubmitTicket(formData);
  };
  return (
    <main>
      <div className="container mx-auto py-5 animate-fadeInUp">
        <h3 className="mb-4">Ticket Summary</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-500 text-white rounded-md flex items-center justify-center"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Book Now & Pay Later"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}