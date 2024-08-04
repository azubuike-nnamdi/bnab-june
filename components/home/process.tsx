"use client";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { process } from "@/lib/data/process";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow() {
  return (
    <button type="button" className="slick-prev">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    </button>
  );
}

function NextArrow() {
  return (
    <button type="button" className="slick-next">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </button>
  );
}

export default function Process() {
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1.current || undefined);
    setNav2(sliderRef2.current || undefined);
  }, []);


  const options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    fade: false,
    draggable: false,
  };

  const options2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    infinite: false,
  };

  return (
    <section className="sm:pt-36 pt-12 sm:px-24 px-6 pb-20 bg-black bg-how-it-works wow fadeInUp">
      <div className="container mx-auto">
        <h2 className="text-4xl font-medium text-white pb-12">
          How It Works
        </h2>
        <div className="flex flex-wrap order-lg-last">
          <div className="w-full lg:w-1/2 lg:order-last box-main-slider">
            <div className=" detail-gallery wow fadeInUp">
              <Slider
                asNavFor={nav2}
                ref={sliderRef1}
                {...options}
                className="main-image-slider"
              >
                {process.map((elm, i) => (
                  <figure key={i}>
                    <Image
                      width={1041}
                      height={689}
                      className="object-cover"
                      src={elm.img}
                      alt="luxride"
                    />
                  </figure>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:order-first flex flex-col justify-between z-10 wow fadeInUp">
            <Slider
              {...options2}
              asNavFor={nav1}
              ref={sliderRef2}
              className="list-how"
            >
              {process.map((elm, i) => (
                <li key={i} className="mb-8 cursor-pointer text-white">
                  <div className="flex gap-6 items-start">
                    <div className="flex flex-col items-center h-full pt-1">
                      <span className="w-4 h-4 rounded-full border-2 border-white/80  mb-2"></span>
                      {/* <span className="border-2 h-full w-0.5 bg-white"></span> */}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-5">{elm.title}</h4>
                      <p className="text-base w-10/12">{elm.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
