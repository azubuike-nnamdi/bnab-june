'use client'

import { BookingTicket, EventCardProps } from "@/types/declaration"
import { Calendar, MapPin, Phone, Timer } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function BookingTicketCard({ event }: Readonly<BookingTicket>) {

  const { data: session } = useSession();
  const router = useRouter();

  const handleBooking = async (eventId: string) => {
    router.push(`/ticket-master/booking/${eventId}`);

    // if (!session) {
    //   await signIn();
    //   router.push(`/ticket-master/booking/${eventId}`);
    // } else {
    //   router.push(`/ticket-master/booking/${eventId}`);
    // }
  };
  return (
    <main>
      <section className="sm:mt-24 sm:px-24 mt-4 px-4">
        <div className="pt-20">
          <h2 className="sm:text-4xl font-semibold">Book Your Ticket</h2>
          <div className="mt-12 flex flex-wrap">
            <div className="w-full lg:w-2/3 mb-8">
              <h5 className="sm:text-xl text-lg font-medium mb-2">
                {event.title}
              </h5>
              <p className="text-sm mb-4">
                {event.desc}
              </p>
              <div className="mt-1">
                <div className="my-4 flex items-center">
                  <MapPin />
                  <span className="mx-2">{event.venue}</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <Timer />
                    <span className="mx-2">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar />
                    <span className="mx-2">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone />
                    <Link className="mx-2" href={`tel:${event.phoneNo}`}>{event.phoneNo}</Link>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <Image
                  width={700}
                  height={326}
                  className="object-contain"
                  src={event.img}
                  alt="event"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/3 mb-8">
              <div className="p-4 shadow-lg rounded-lg bg-[#F0FBF7]">
                <ul className="list-none">
                  <li className="flex justify-between">
                    <span className="text-sm">Amount</span>
                    <span className="font-bold">{event.price}</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    className="btn btn-primary w-full"
                    onClick={() => handleBooking(event.id)}
                  >
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