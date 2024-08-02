"use client";
import { cars } from "@/lib/data/car-data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Fleet() {
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn1",
      prevEl: ".snbp1",
    },
    modules: [Navigation, Autoplay],
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
      670: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      400: {
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
    <section className="pt-12 pb-28 bg-our-fleet sm:mx-6">
      <div className=" mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold  wow fadeInUp">
              Dedicated Rides
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="relative">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            spaceBetween={20}
            slidesPerView={4}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay
            onSwiper={() => { }}
            className="swiper-container swiper-group-4-fleet pb-0"
          >
            {cars.map((elm) => (
              <SwiperSlide key={elm.id} className="swiper-slide">
                <div className="bg-white rounded-lg shadow-lg p-6 wow fadeInUp">
                  <div>
                    <Link href={`/dedicated-rides/${elm.id}`}>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
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
                  <div className="flex items-center mb-4">
                    <p className="font-bold mr-2">{elm.amt}</p>
                    <p className="text-gray-600">{elm.duration}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="icon-circle icon-passenger"></span>
                      <span className="text-sm ml-2">
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
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="swiper-button-prev snbp1">
                <svg
                  className="w-6 h-6"
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div className="swiper-button-next snbn1">
                <svg
                  className="w-6 h-6"
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  )
}