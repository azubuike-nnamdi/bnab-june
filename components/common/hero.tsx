"use client";
import { tabs } from "@/lib/data/data";
import clsx from "clsx";
import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from 'swiper/types';

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

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
    onSwiper: setSwiperRef,
    onSlideChange: (swiper: SwiperClass) => {
      if (swiper.isEnd) {
        setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
        swiper.slideTo(0);
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
    <section className="relative overflow-visible min-h-screen">
      <Swiper
        {...settings}
        className="swiper-container"
        style={{ maxWidth: "100vw", overflow: "hidden", minHeight: '100vh' }}
      >
        {tabs[activeTab].banners.map((elm) => (
          <SwiperSlide key={elm.id} className="relative h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${elm.url})`,
                backgroundSize: 'cover',
                minHeight: '100vh',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <div className="relative z-10 md:py-56 py-32 md:px-12 px-8 text-white">
              <div className="text-center flex  items-center gap-3">
                <MoveLeft
                  className="text-black text-2xl hover:text-yellow-500 bg-white rounded-full w-5 h-5 p-1"
                  onClick={() => swiperRef?.slidePrev()} />
                <p className="md:text-lg text-md">{elm.text}</p>
                <MoveRight
                  className="text-black text-2xl hover:text-yellow-500 bg-white rounded-full w-5 h-5 p-1"
                  onClick={() => swiperRef?.slideNext()} />
              </div>
              <h2 className="md:text-5xl text-2xl font-medium mt-4">
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
