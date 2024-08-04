'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
  const router = useRouter();

  // Function to handle going back to the previous page
  const goBack = () => {
    router.back(); // This takes the user back to the previous page
  };

  return (
    <section className="mt-32 mb-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Image
            width={770}
            height={538}
            className="animate-fadeInUp"
            src="/img/404.svg"
            alt="luxride"
          />
          <h2 className="text-4xl font-medium text-gray-800 mt-12 mb-5 animate-fadeInUp">
            Oops! It looks like you&apos;re lost.
          </h2>
          <p className="text-base text-gray-600 mb-6 animate-fadeInUp">
            The page you&apos;re looking for isn&apos;t available. Try to search again or use the go to.
          </p>
          <button
            className="btn btn-primary px-12 py-3 animate-fadeInUp flex items-center justify-center"
            onClick={goBack}
          >
            Go Back to Previous Page
            <svg
              className="w-4 h-4 ml-2"
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
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
