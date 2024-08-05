import { BreadCrumb } from "@/components/common/breadcrumb";
import { trainingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Training" links={trainingLink} />
    </main>
  )
}