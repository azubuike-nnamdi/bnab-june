import Image from 'next/image'

export const Art = () => {
  return (
    <div className='sm:px-24 px-8'>
      <div className='sm:flex sm:gap-8 items-center'>
        <div>
          <Image src={'https://bnab-june.s3.amazonaws.com/img/skills-3.png'} alt='ankara-training' width={1000} height={800} className='rounded' />
        </div>
        <div className='md={6}'>
          <h1 className='font-bold sm:text-6xl text-2xl'>Arts and Crafts <span className='font-bold sm:text-5xl text-gray-700 text-xl'> Workshops</span>  </h1>
          <h3 className='text-[18px] font-bold mx-[0] my-[8px]'>Get hands-on with Ghana’s rich artisanal traditions:</h3>
          <ul className='list-disc list-inside pl-5'>
            <li className='mb-2 text-xs: '>
              <span className='font-semibold sm:text-lg text-sm'>Basic Kente Weaving:</span> Learn the basics of this iconic Ghanaian textile and weave your own colorful piece.
            </li>
            <li className='mb-2'>
              <span className='font-semibold sm:text-lg text-sm'>Wood Carving:</span> Create your own unique wood carvings under the guidance of experienced craftsmen.
            </li>
            <li className='mb-2'>
              <span className='font-semibold'>Basket Weaving:</span> Weave beautiful and functional baskets using traditional methods.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
