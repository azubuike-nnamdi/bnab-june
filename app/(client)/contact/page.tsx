import { BreadCrumb } from '@/components/common/breadcrumb'
import Faq from '@/components/common/faq'
import ContactCard from '@/components/contact/contactCard'
import { contactLink } from '@/lib/data/breadcrumb'

import React from 'react'

export default function page() {
  return (
    <div>
      <BreadCrumb title='Contact us' links={contactLink} />
      <ContactCard />
      <Faq />
    </div>
  )
}
