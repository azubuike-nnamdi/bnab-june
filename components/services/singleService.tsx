'use client'



import { features7 } from "@/lib/data/feature-data";
import { SingleServiceProps } from "@/types/declaration";
import Image from "next/image";
import React from "react";
import { Fade } from "react-awesome-reveal";


const SingleService = ({
  subTitle1,
  paragraph1,
  image1,
  subTitle2,
  paragraph2,
  subTitle3,
  paragraph3,
  image2
}: Readonly<SingleServiceProps>) => {
  return (
    <Fade direction="up" cascade triggerOnce>
      <section className="section sm:px-24 px-4">
        <div className="container-sub">
          <div className="mt-20 md:mt-40 lg:mt-120">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 md:mb-12 lg:mb-16 text-gray-900 dark:text-white title-fleet animate-fade-in">
              {subTitle1}
            </h2>
            <div className="content-single animate-fade-in">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 md:mb-8 lg:mb-10">
                {paragraph1}
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-10 md:mb-12 lg:mb-16">
                {features7.map((elm, i) => (
                  <li key={i} className="mb-4 md:mb-5">
                    {elm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-10 md:mt-20 lg:mt-32">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
              <Image
                width={500}
                height={500}
                className="h-auto"
                src={image1 as string}
                alt="luxride"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 animate-fade-in">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white mb-6 md:mb-8">
                  {subTitle2}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {paragraph2}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-10 md:mt-20 lg:mt-32 mb-16 md:mb-32">
            <div className="md:w-1/2 md:pr-10 animate-fade-in">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white mb-6 md:mb-8">
                  {subTitle3}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {paragraph3}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
              <Image
                width={500}
                height={500}
                className="h-auto"
                src={image2 as string}
                alt="luxride"
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}

export default SingleService;
