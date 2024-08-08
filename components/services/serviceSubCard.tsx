"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { features8 } from "@/lib/data/feature-data";
import { Fade } from "react-awesome-reveal";

interface FeatureItem {
  id: number;
  imgSrc: string;
  title: string;
  desc: string;
}

export default function ServiceSubCard() {
  const pathname = usePathname();
  const match = pathname.match(/\/service-single\/(\d+)/);
  const pageId = match ? parseInt(match[1], 10) : NaN;

  const features = features8[pageId - 1] as FeatureItem[];

  return (
    <Fade direction="up" cascade triggerOnce>
      <section className="section sm:px-24 px-4 sm:mt-8 pt-4">
        <div className="container-sub">
          <div className="grid sm:grid-cols-3 grid-cols-1 items-center">
            {features.map((elm) => (
              <div
                key={elm.id}
                className="items-center"
              >
                <div className="">
                  <div className="cardIcon mb-4">
                    <Image
                      width={56}
                      height={56}
                      src={elm.imgSrc}
                      alt={elm.title}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-center mb-2">
                    <h5 className="text-[20px] font-medium text-gray-900 dark:text-white">
                      {elm.title}
                    </h5>
                  </div>
                  <div className="text-center">
                    <p className="text-[16px] text-gray-700 dark:text-gray-300">
                      {elm.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
}
