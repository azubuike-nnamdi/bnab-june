'use client';


import { eventData } from "@/lib/data/event-data";
import { Fade } from "react-awesome-reveal";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { LocationIcon } from "../common/icons";
import { useState } from "react";
import { truncateText } from "@/lib/helper";
import { Button } from "../ui/button";
import Link from "next/link";
import { Calendar, CircleDollarSign, MapPin, Timer } from "lucide-react";
import { ExpandedState } from "@/types/declaration";

export default function EventCard() {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleReadMore = (id: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <Fade direction="up" triggerOnce cascade>
      <main className="md:p-24 smp-12 p-4">
        <h2 className="sm:text-3xl font-semibold text-xl py-6">Our Event</h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {/* Event Cards */}
          {eventData.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <Image src={event.img} width={200} height={300} alt={event.title}
                  className="w-full" />
              </CardHeader>
              <CardContent>
                <h2 className="font-bold sm:text-xl text-lg">{event.title}</h2>
                <p className="text-sm">
                  {expanded[event.id] ? event.desc : truncateText(event.desc, 50)}
                  {event.desc.length > 30 && (
                    <span
                      className="text-sm font-medium cursor-pointer text-gray-400 ml-5"
                      onClick={() => handleReadMore(event.id)}
                    >
                      {expanded[event.id] ? 'Read Less' : 'Read More'}
                    </span>
                  )}
                </p>
                <div className="flex py-3 gap-3">
                  <MapPin />
                  <p className="text-xs"> {event.venue}  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2">
                    <Timer />
                    <p> {event.time} </p>
                  </div>

                  <div className="flex gap-2">
                    <CircleDollarSign />
                    <p> From {event.price} </p>
                  </div>
                </div>

              </CardContent>
              <CardFooter>
                <Link href={`/ticket-master/${event.id}`}>
                  <Button>Buy Ticket</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </Fade>
  )
}