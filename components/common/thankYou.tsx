'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { thankYouPropType } from '@/types/declaration';

// const CelebrationSpray = () => {
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     const colors = ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#32CD32'];
//     const newParticles = Array.from({ length: 50 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: 110 + Math.random() * 20,
//       size: Math.random() * 5 + 2,
//       color: colors[Math.floor(Math.random() * colors.length)],
//       speed: 2 + Math.random() * 3,
//     }));
//     setParticles(newParticles);

//     const animationFrame = requestAnimationFrame(function animate() {
//       setParticles(currentParticles =>
//         currentParticles.map(particle => ({
//           ...particle,
//           y: particle.y - particle.speed,
//         })).filter(particle => particle.y > -10)
//       );
//       if (particles.length > 0) {
//         requestAnimationFrame(animate);
//       }
//     });

//     const timer = setTimeout(() => {
//       cancelAnimationFrame(animationFrame);
//       setParticles([]);
//     }, 3000);

//     return () => {
//       clearTimeout(timer);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute rounded-full"
//           style={{
//             left: `${particle.x}%`,
//             bottom: `${particle.y}%`,
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             backgroundColor: particle.color,
//             transition: 'bottom 0.1s linear',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

const ThankYou = ({ status }: Readonly<thankYouPropType>) => {
  const [showCelebration, setShowCelebration] = useState(false);

  // useEffect(() => {
  //   if (status === 'success') {
  //     setShowCelebration(true);
  //   }
  // }, [status]);

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mb-4" />,
          title: "System, your order was submitted successfully!",
          color: "text-green-500",
          message: "Booking details has been sent to: booking@luxride.com"
        };
      case 'failure':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mb-4" />,
          title: "Payment failed. Please try again.",
          color: "text-red-500",
          message: "If the problem persists, please contact our support team."
        };
      case 'pending':
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500 mb-4 animate-pulse" />,
          title: "Payment is being processed...",
          color: "text-yellow-500",
          message: "Please wait while we confirm your payment. This may take a few moments."
        };
      default:
        return {
          icon: null,
          title: "Unknown payment status",
          color: "text-gray-500",
          message: "Please contact our support team for assistance."
        };
    }
  };

  const { icon, title, color, message } = getStatusContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* {showCelebration && <CelebrationSpray />} */}
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          {icon}
          <h1 className={`text-2xl font-bold text-center ${color}`}>{title}</h1>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Number</p>
                <p className="text-sm font-bold">#4039</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">Thu, Oct 06, 2022</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-sm font-bold">$40.10</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-sm">Direct Bank Transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservation Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Reservation details would go here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;