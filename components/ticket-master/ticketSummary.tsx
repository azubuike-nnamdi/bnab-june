import { Button } from "../ui/button";
import { TicketBookingFormDataProps } from "@/types/declaration";

interface TicketSummaryProps {
  formData: TicketBookingFormDataProps;
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

export default function TicketSummary({
  formData,
  activeTabIndex,
  setActiveTabIndex,
}: Readonly<TicketSummaryProps>) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setActiveTabIndex(activeTabIndex + 1);
  };

  return (
    <main>
      <div className="container mx-auto py-5 animate-fadeInUp">
        <h3 className="mb-4">Ticket Summary</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2">Last Name</label>
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
              <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="ticketType" className="block mb-2">Ticket Type</label>
            <input
              type="text"
              id="ticketType"
              value={formData.ticketType}
              disabled
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {formData.isBookingForSelf ? null : (
            <section>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="forBookingFirstName" className="block mb-2">Person First Name</label>
                  <input
                    type="text"
                    id="forBookingFirstName"
                    value={formData.forBookingFirstName}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="forBookingLastName" className="block mb-2">Person Last Name</label>
                  <input
                    type="text"
                    id="forBookingLastName"
                    value={formData.forBookingLastName}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="forBookingEmail" className="block mb-2">Person Email</label>
                  <input
                    type="email"
                    id="forBookingEmail"
                    value={formData.forBookingEmail}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="forBookingPhoneNumber" className="block mb-2">Person Phone Number</label>
                  <input
                    type="text"
                    id="forBookingPhoneNumber"
                    value={formData.forBookingPhoneNumber}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </section>
          )}
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
