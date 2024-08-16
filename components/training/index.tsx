"use client"

import Image from 'next/image'

export default function Training() {
  return (
    <div className='sm:px-24 p-8'>
      <div className='sm:flex items-center gap-6'>
        <div className=''>
          <h1 className='font-bold sm:text-6xl text-2xl'>Discover the <span className='sm:text-4xl text-gray-700 flex flex-col-reverse mt-5'> Heartbeat of Ghana!</span>  </h1>
          <p className='text-124px] font-bold mx-[0] my-[8px]'>Join Us for Authentic Cultural Experiences!</p>
          <p className='sm:text-md text-sm'>
            Are you ready to immerse yourself in the rich cultural heritage of Ghana? Whether you&apos;re a tourist or a traveler at heart, we invite you to explore and learn through our exclusive cultural lessons:
          </p>
        </div>
        <div className=''>
          <Image src={'https://bnab-june.s3.amazonaws.com/img/skills-5.png'} alt='basket-weaving' width={1500} height={800} />
        </div>
      </div>
    </div>
  );

}