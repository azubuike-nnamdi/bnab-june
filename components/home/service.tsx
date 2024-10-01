'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { services } from "@/lib/data/services";
import { Fade } from "react-awesome-reveal";
import { MoveUpRight } from "lucide-react";
import { SERVICES_URL } from "@/config/routes";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

const Service: React.FC = () => {
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    loop: true,
    modules: [Autoplay],
    autoplay: {
      delay: 10000,
    },
    breakpoints: {
      1399: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <Fade direction="up" cascade triggerOnce>
      <section className="py-10">
        <div className="container mx-auto sm:px-24">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-medium swiper-title">
                Our Services
              </h2>
            </div>
            <div className="w-full lg:w-1/2 text-right">
              <Link
                className="text-base font-medium text-primary flex items-center justify-end"
                href={SERVICES_URL}
              >
                More Services
                <MoveUpRight className="w-5 h-5 font-normal" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:pl-24">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            className="swiper-container swiper-group-4-service pb-0 sm:pl-24 "
          >
            {services.map((elm: ServiceItem) => (
              <SwiperSlide key={elm.id} className="swiper-slide">
                <Link href={elm?.href}>
                  <div className="relative bg-white shadow-lg rounded-lg overflow-hidden group">
                    <div className="relative h-80">
                      <Image
                        width={370}
                        height={400}
                        className="object-cover w-full h-full"
                        src={elm.image}
                        alt={elm.title}
                      />
                      <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 group-hover:opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white transition-transform duration-300 transform group-hover:translate-y-0 translate-y-16">
                        <h3 className="text-2xl font-medium mb-6">{elm.title}</h3>
                        <p className="text-xs mb-4">{elm.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

    </Fade>
  );
};

export default Service;
