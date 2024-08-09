import { BreadCrumb } from "@/components/common/breadcrumb";
import Training from "@/components/training";
import { Art } from "@/components/training/Art";
import { Discover } from "@/components/training/Discover";
import TrainingCard from "@/components/training/TrainingCard";
import { trainingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Training" links={trainingLink} />
      <Training />
      <TrainingCard/>
      <Art/>
      <Discover />
    </main>
  )
}