"use client"

import Image from 'next/image'

export default function Training() {
    return (
        <div className='max-w-[1170px] w-full pr-[var(--bs-gutter-x, .75rem)] pl-[var(--bs-gutter-x, .75rem)] mr-auto ml-auto py-5'>
        <div className='flex items-center'>
          <div className='md={6}'>
            <h1 className='font-bold text-6xl'>Discover the <span className='text-6xl text-gray-700 flex flex-col-reverse mt-5'> Heartbeat of Ghana!</span>  </h1>
            <p className='text-[24px] font-bold mx-[0] my-[8px]'>Join Us for Authentic Cultural Experiences!</p>
            <p className='flex flex-nowrap'>
              Are you ready to immerse yourself in the rich cultural heritage of Ghana? Whether you&apos;re a tourist or a traveler at heart, we invite you to explore and learn through our exclusive cultural lessons:
            </p>
          </div>
          <div className='md={6}'>
            <Image src={'https://bnab-june.s3.amazonaws.com/img/skills-5.png'} alt='basket-weaving' width={500} height={300} />
          </div>
        </div>
      </div>
    );

}