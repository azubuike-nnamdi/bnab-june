'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { services } from "@/lib/data/services";
import { ServiceItem } from "@/types/declaration";

const ServiceCard: React.FC = () => {

  return (
    <section className="py-10 ">
      <div className="sm:mt-8 mt-4">
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-3 sm:px-24 px-4">
          {services.map((elm: ServiceItem) => (
            <Link key={elm.id} href={`/service-single/${elm.id}`}>
              <div className="cardService bg-white shadow-lg rounded-lg overflow-hidden relative group">
                <div className="h-80 relative overflow-hidden">
                  <Image
                    width={370}
                    height={400}
                    className="object-cover w-full h-full"
                    src={elm.image}
                    alt={elm.title}
                  />
                  <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white transition-transform duration-300 transform group-hover:translate-y-0 translate-y-full">
                    <h3 className="text-xl font-medium mb-2">{elm.title}</h3>
                    <p className="text-sm mb-4 group-hover:block hidden">{elm.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceCard;
