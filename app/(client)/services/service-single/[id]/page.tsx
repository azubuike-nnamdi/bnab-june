import { BreadCrumb } from "@/components/common/breadcrumb"
import ServiceSubCard from "@/components/services/serviceSubCard";
import SingleService from "@/components/services/singleService";
import { HOME_URL, SERVICES_URL } from "@/config/routes"
import { allServices } from "@/lib/data/services";
import { AllServices, ParamProps } from "@/types/declaration"

export default function page({ params }: Readonly<ParamProps>) {
  const service: AllServices =
    allServices.filter((elm) => elm.id === Number(params.id))[0] || allServices[0];

  const breadcrumbLink = [
    { id: 1, path: HOME_URL, text: "Home" },
    { id: 2, path: SERVICES_URL, text: "Services" },
    { id: 3, path: `/services/service-single/${params.id}`, text: service.title },
  ]
  return (
    <main>
      <BreadCrumb title={service.title} links={breadcrumbLink} />
      <ServiceSubCard />
      <SingleService subTitle1={service.subTitle1} paragraph1={service.paragraph1}
        image1={service.image1} subTitle2={service.subTitle2} paragraph2={service.paragraph2} subTitle3={service.subTitle3}
        paragraph3={service.paragraph3} image2={service.image2}
      />
    </main>
  )
}


