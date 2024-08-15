"use client";
import { tabs } from "@/lib/data/data";
import clsx from "clsx";
import React, { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from 'swiper/types';

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const settings = {
    spaceBetween: 30,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
    },
    modules: [Autoplay],
    autoplay: {
      delay: 10000,
    },
    onSlideChange: (swiper: SwiperClass) => { // Type the swiper parameter
      if (swiper.isEnd) {
        // Move to the next tab if the last slide is reached
        setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
        swiper.slideTo(0); // Reset to the first slide of the next tab
      }
    },
    breakpoints: {
      1399: {
        slidesPerView: 1,
      },
      1100: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 1,
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
    <section className="relative overflow-hidden h-screen">
      <Swiper
        {...settings}
        className="swiper-container"
        style={{ maxWidth: "100vw", overflow: "hidden" }}
      >
        {tabs[activeTab].banners.map((elm) => (
          <SwiperSlide key={elm.id} className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${elm.url})`,
                backgroundSize: 'cover',
                minHeight: '100vh'
              }}
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <div className="relative z-10 md:py-56 py-32 md:px-12 px-8 text-white">
              <p className="md:text-lg text-md">{elm.text}</p>
              <h2 className="md:text-5xl text-2xl font-medium">
                {elm.text.split(" ").slice(0, 2).join(" ")}{" "}
                <br className="hidden lg:block" />
                {elm.text.split(" ").slice(2).join(" ")}
              </h2>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
      <div className="flex justify-between ">
        <div className="btn-group sm:flex w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab?.name}
              className={clsx(
                "px-4 py-2 border-r-1 w-full text-center",
                activeTab === index ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
