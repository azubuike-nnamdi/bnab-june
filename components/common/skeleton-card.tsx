import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-full h-48" /> {/* Image Placeholder */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-1/2 mb-4" /> {/* Title Placeholder */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Text Placeholder */}
        <Skeleton className="h-4 w-3/4 mb-4" /> {/* Another line of text */}
        <div className="flex gap-3 py-3">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-1/2" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
