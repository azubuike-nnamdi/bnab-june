"use client";
import { tabs } from "@/lib/data/data";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);


  return (
    <section className="relative overflow-hidden h-screen">
      <Swiper
        slidesPerView={1}
        className="swiper-container"
      >
        {tabs[activeTab].banners.map((elm) => (
          <SwiperSlide key={elm.id} className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${elm.url})`,
              }}
            ></div>
            <div className="relative z-10 md:py-56 md:px-12 text-white">
              <p className="md:text-lg text-md">{elm.text}</p>
              <h2 className="md:text-5xl text-2xl font-medium">
                {elm.text.split(" ").slice(0, 2).join(" ")}{" "}
                <br className="hidden lg:block" />
                {elm.text.split(" ").slice(2).join(" ")}
              </h2>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <div className="swiper-button-prev snbp2 bg-gray-800 text-white p-2 rounded-full"></div>
          <div className="swiper-button-next snbn2 bg-gray-800 text-white p-2 rounded-full"></div>
          <div className="swiper-pagination sph1"></div>
        </div>
      </Swiper>
      <div className="flex justify-between ">
        <div className="btn-group flex w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab?.name}
              className={`px-4 py-2 border-r-1 w-full  text-center  ${activeTab === index ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"}`}
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
