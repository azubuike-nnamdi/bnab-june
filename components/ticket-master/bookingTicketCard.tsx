import { BookingTicket } from "@/types/declaration"
import { Calendar, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatDateString } from "@/lib/helper";

export default function BookingTicketCard({ event }: Readonly<BookingTicket>) {
  const formattedDate = formatDateString(event?.startdate)

  const eventImage =
    event?.banner_photo?.url ||
    event?.banner_photo?.mobile?.url ||
    event?.banner_photo?.thumb?.url ||
    '/placeholder-image.jpg'; // Fallback image
  return (
    <main>
      <section className="sm:mt-24 sm:px-24 mt-4 px-4">
        <div className="pt-20">
          <h2 className="sm:text-4xl font-semibold">Book Your Ticket</h2>
          <div className="mt-12 flex flex-wrap">
            <div className="w-full lg:w-2/3 mb-8">
              <h5 className="sm:text-xl text-lg font-medium mb-2">
                {event?.name}
              </h5>
              <p className="text-sm mb-4">
                {event?.text_description}
              </p>
              <div className="mt-1">
                <div className="my-4 flex items-center">
                  <MapPin />
                  <span className="mx-2">{event?.venue_name}, {event?.city}, {event?.country_name}</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <Calendar />
                    <span className="mx-2">{formattedDate}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                {eventImage && (
                  <Image
                    width={500}
                    height={326}
                    className="object-contain w-full"
                    src={eventImage}
                    alt={event.name}
                  />
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 mb-8">
              <div className="p-4 shadow-lg rounded-lg bg-[#F0FBF7]">
                <h3 className="text-lg font-semibold mb-4">Ticket Options</h3>
                <ul className="list-none">
                  {event?.tickets?.filter(ticket => !ticket.stop_sales).map((ticket) => (
                    <li
                      key={ticket.id}
                      className="flex justify-between items-center my-2 pb-2 border-b"
                    >
                      <div>
                        <span className="text-sm font-semibold block">{ticket.name}</span>
                        <span className="text-xs text-gray-500">
                          {ticket.quantity} tickets available
                        </span>
                      </div>
                      <span className="text-sm font-bold">
                        {event.currency} {ticket.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <Link href={`/ticket-master/booking/${event?.id}`}>
                    <Button className="btn btn-primary w-full">
                      Book Now
                      <svg
                        className="w-4 h-4 ml-1 inline-block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        ></path>
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap mt-8">
                <div className="w-1/2 p-2">
                  <span className="text-sm">Meet & Greet included</span>
                </div>
                <div className="w-1/2 p-2">
                  <span className="text-sm">Free cancellation</span>
                </div>
                <div className="w-1/2 p-2">
                  <span className="text-sm">Free Waiting time</span>
                </div>
                <div className="w-1/2 p-2">
                  <span className="text-sm">Safe and secure travel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}