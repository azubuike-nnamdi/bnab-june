'use client';

import { Fade } from "react-awesome-reveal";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { truncateText } from "@/lib/helper";
import { Button } from "../ui/button";
import Link from "next/link";
import { CircleDollarSign, MapPin, Timer } from "lucide-react";
import { ExpandedState } from "@/types/declaration";
import useGetAllTicketEvents from "@/hooks/useGetAllTicketEvent";
import SkeletonCard from "../common/skeleton-card";
import useGetEvents from "@/hooks/useGetEvents";

interface Event {
  id: number;
  name: string;
  text_description: string;
  banner_photo: {
    url: string;
    mobile?: { url: string };
    thumb?: { url: string };
  };
  venue_name: string;
  address: string;
  startdate: string;
  tickets: Array<{
    price: string;
  }>;
}

export default function EventCard() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { isPending: isFetchingEvents, data: eventsData } = useGetEvents();

  const eventData: Event[] = eventsData?.data ?? [];

  const handleReadMore = (id: number) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Independent logic for rendering content
  let content;

  if (isFetchingEvents) {
    content = (
      Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
    );
  } else if (eventData && eventData.length > 0) {
    content = eventData.map((event: Event) => {
      // Choose the best available image
      const eventImage =
        event.banner_photo?.url ||
        event.banner_photo?.mobile?.url ||
        event.banner_photo?.thumb?.url ||
        '/placeholder-image.jpg'; // Fallback image

      // Get the lowest ticket price
      const lowestPrice = Math.min(
        ...event.tickets.map(ticket => parseFloat(ticket.price))
      );

      return (
        <Card key={event.id}>
          <CardHeader>
            <Image
              src={eventImage}
              width={400}
              height={300}
              alt={event.name}
              className="w-full h-56 object-cover"
            />
          </CardHeader>
          <CardContent>
            <h2 className="font-bold sm:text-xl text-lg">{event.name}</h2>
            <p className="text-sm">
              {expanded[event.id]
                ? event.text_description
                : truncateText(event.text_description, 50)}
              {event.text_description.length > 50 && (
                <button
                  type="button"
                  className="text-sm font-medium cursor-pointer text-gray-400 ml-5"
                  onClick={() => handleReadMore(event.id)}
                >
                  {expanded[event.id] ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>
            <div className="flex py-3 gap-3">
              <MapPin />
              <p className="text-xs">{event.venue_name}, {event.address}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <Timer />
                <p>{new Date(event.startdate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <CircleDollarSign />
                <p>From ₵{lowestPrice}.00</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/ticket-master/${event.id}`}>
              <Button>Buy Ticket</Button>
            </Link>
          </CardFooter>
        </Card>
      );
    });
  } else {
    content = (
      <div className="col-span-3 text-center py-6">
        <p className="text-lg font-semibold">No event data available</p>
      </div>
    );
  }

  return (
    <Fade direction="up" triggerOnce cascade>
      <main className="md:p-24 sm:p-12 p-4">
        <h2 className="sm:text-3xl font-semibold text-xl py-6">Our Events</h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {content}
        </div>
      </main>
    </Fade>
  );
}