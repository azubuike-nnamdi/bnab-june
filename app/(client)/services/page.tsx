import { BreadCrumb } from '@/components/common/breadcrumb'
import Faq from '@/components/common/faq'
import ServiceCard from '@/components/services/servicesCard'
import { servicesLink } from '@/lib/data/breadcrumb'

import React from 'react'

const Services = () => {
  return (
    <div>
      <BreadCrumb title="Services" links={servicesLink} />
      <ServiceCard />
      <Faq />
    </div>
  )
}
export default Services