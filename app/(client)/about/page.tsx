import AboutFeature from '@/components/about/aboutFeature'
import Hero from '@/components/about/hero'
import { BreadCrumb } from '@/components/common/breadcrumb'
import Faq from '@/components/common/faq'
import Partners from '@/components/common/partners'
import Features from '@/components/home/feature'
import Process from '@/components/home/process'
import { aboutLink } from '@/lib/data/breadcrumb'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <BreadCrumb title='About Us' links={aboutLink} />
      <Hero />
      <AboutFeature />
      <Features />
      <Process />
      <Partners />
      <Faq />
    </div>
  )
}

export default page