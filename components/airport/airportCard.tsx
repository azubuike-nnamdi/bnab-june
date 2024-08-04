'use client';


import { PickUpAndDropOffData } from '@/lib/data/airport-data'
import Image from 'next/image'
import React from 'react'
import { Fade } from 'react-awesome-reveal';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL } from '@/config/routes';

export default function AirportCard() {
  return (
    <Fade direction='up' cascade triggerOnce>
      <div className='sm:p-24 p-4'>
        <h1 className='sm:text-3xl text-xl font-semibold py-3'>Book Your Airport Taxi</h1>
        <p>Easy airport transfers to and from your accommodation</p>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4  sm:py-8 py-4">
          {PickUpAndDropOffData.map((pickup) => (
            <main key={pickup.id} className='text-center items-center'>
              <Image src={pickup.img} alt={pickup.title} width={50} height={50}
                className='mx-auto' />
              <h1 className=' py-4 text-2xl font-semibold'>{pickup.title} </h1>
              <p>{pickup.desc} </p>
            </main>
          ))}
        </div>
        <Link href={AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL} className='flex items-center justify-center'>
          <Button>Book Now</Button>
        </Link>
      </div>
    </Fade>
  )
}   
