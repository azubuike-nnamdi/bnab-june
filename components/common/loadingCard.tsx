// components/LoadingCard.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface LoadingCardProps {
  className?: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => {
  return (
    <Card className={`animate-pulse ${className}`}>
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="h-32 bg-gray-200 rounded"></div>
      </CardContent>
      <CardFooter>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </CardFooter>
    </Card>
  );
};

export default LoadingCard;
