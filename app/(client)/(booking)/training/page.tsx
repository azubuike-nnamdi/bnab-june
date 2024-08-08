import { BreadCrumb } from "@/components/common/breadcrumb";
import TrainingHomepage from "@/components/training/homepage";
import { trainingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Training" links={trainingLink} />
      <TrainingHomepage />
    </main>
  )
}