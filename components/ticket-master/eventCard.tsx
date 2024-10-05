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

interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  time: string;
  price: string;
  noOfTickets: number;
}

export default function EventCard() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { isPending, data } = useGetAllTicketEvents();

  // Extract the eventData from the fetched data
  const eventData: Event[] | undefined = data?.data?.events;

  const handleReadMore = (id: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Independent logic for rendering content
  let content;

  if (isPending) {
    content = (
      Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
    );
  } else if (eventData && eventData.length > 0) {
    content = eventData.map((event: Event) => (
      <Card key={event._id}>
        <CardHeader>
          <Image
            src={event.image}
            width={200}
            height={300}
            alt={event.title}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold sm:text-xl text-lg">{event.title}</h2>
          <p className="text-sm">
            {expanded[event._id] ? event.description : truncateText(event.description, 50)}
            {event.description.length > 30 && (
              <button
                type="button"
                className="text-sm font-medium cursor-pointer text-gray-400 ml-5"
                onClick={() => handleReadMore(event._id)}
              >
                {expanded[event._id] ? 'Read Less' : 'Read More'}
              </button>
            )}
          </p>
          <div className="flex py-3 gap-3">
            <MapPin />
            <p className="text-xs">{event.address}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Timer />
              <p>{event.time}</p>
            </div>
            <div className="flex gap-2">
              <CircleDollarSign />
              <p>From {event.price}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {event.noOfTickets > 0 ? (
            <Link href={`/ticket-master/${event._id}`}>
              <Button>Buy Ticket</Button>
            </Link>
          ) : (
            <Button disabled>Ticket is Sold Out</Button>
          )}
        </CardFooter>
      </Card>
    ));
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
        <h2 className="sm:text-3xl font-semibold text-xl py-6">Our Event</h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {/* Render the content */}
          {content}
        </div>
      </main>
    </Fade>
  );
}
