"use client";
import { cars } from "@/lib/data/car-data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Fade } from "react-awesome-reveal";


export default function Fleet() {

  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
    },
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
      <section className="pt-12 pb-28 bg-our-fleet sm:mx-6">
        <div className="mx-auto sm:px-24">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold  wow fadeInUp">
                Dedicated Rides
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:pl-24">
          <div className="relative">
            <Swiper
              {...settings}
              className="mySwiper pb-0"
            >
              {cars.map((elm) => (
                <SwiperSlide key={elm.id} className="">
                  <div className="bg-white rounded-lg shadow-lg p-6 wow fadeInUp">
                    <div>
                      <Link href={`/dedicated-rides/${elm.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {elm.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-700 mb-6">
                        {elm.description}
                      </p>
                    </div>
                    <div className="mb-6">
                      <Link href={`/dedicated-rides/${elm.id}`}>
                        <Image
                          width={1530}
                          height={711}
                          style={{ height: "fit-content" }}
                          src={elm.imgSrc}
                          alt="Luxride"
                        />
                      </Link>
                    </div>
                    {/* <div className="flex items-center mb-4">
                      <p className="font-bold mr-2">{elm.amt}</p>
                      <p className="text-gray-600">{elm.duration}</p>
                    </div> */}
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="icon-circle icon-passenger"></span>
                        <span className="text-sm">
                          Passengers<span>{" "}{elm.passenger}</span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="icon-circle icon-luggage"></span>
                        <span className="text-sm ml-2">
                          Luggage<span>{" "}{elm.luggage}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </Fade>
  );
}
