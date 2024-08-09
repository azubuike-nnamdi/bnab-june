import { training } from "@/lib/data/training-data"

export const TrainingCard = () => {
  return (
    <main>
      <hr className='mb-4' />
       <div className='max-w-[1170px] w-full pr-[var(--bs-gutter-x, .75rem)] pl-[var(--bs-gutter-x, .75rem)] mr-auto ml-auto '>
        <div>
          {training.map((training) => (
            <div key={training.id} className='mb-4 xs={12} sm={6} md={4} lg={6} '>
              <div className='relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-200 shadow'>
                <div className='flex-auto p-6'>
                  <h3 className='mb-3 '>{training.title}</h3>
                  <p className='mb-0'>{training.desc}</p>
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </main>
  )
}

export default TrainingCard
