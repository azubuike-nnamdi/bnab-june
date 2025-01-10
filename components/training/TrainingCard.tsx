'use client';

import { trainingOptions } from "@/lib/data/data"
import { Card, CardContent } from "../ui/card"
import { Clock, Users } from "lucide-react"
import React from "react"
import { Fade } from "react-awesome-reveal";
import { TrainingBookingForm } from "./trainingBookingForm";

export const TrainingCard = () => {
  const [selectedOption, setSelectedOption] = React.useState<typeof trainingOptions[0] | null>(null);

  return (
    <>
      <Fade direction="up" cascade triggerOnce>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingOptions.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedOption(option)}
            >
              <CardContent className="p-4">
                <h2 className="font-bold text-lg mb-2">{option.title}</h2>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{option.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Users className="h-4 w-4" />
                  <span>{option.duration}</span>
                </div>

                <div className="text-sm">
                  <strong>Topics covered:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {option.topics.map((topic, index) => (
                      <li key={index} className="text-gray-600">{topic}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Fade>

      {/* Move the form outside of the Fade component */}
      {selectedOption && (
        <TrainingBookingForm
          option={selectedOption}
          onClose={() => setSelectedOption(null)}
        />
      )}
    </>
  )
}

export default TrainingCard