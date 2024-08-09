import Image from 'next/image'

export const Art = () => {
  return (
    <main>
      <div className='max-w-[1170px] w-full pr-[var(--bs-gutter-x, .75rem)] pl-[var(--bs-gutter-x, .75rem)] mr-auto ml-auto'>
        <div className='d-flex align-items-center md={12}'>
          <div className='md={6}'>
            <Image src={'https://bnab-june.s3.amazonaws.com/img/skills-3.png'} alt='ankara-training' width={500} height={300} className='rounded' />
          </div>
          <div className='md={6}'>
            <h1 className='font-bold text-6xl'>Arts and Crafts <span className='font-bold text-6xl text-gray-700'> Workshops</span>  </h1>
            <h3 className='text-[24px] font-bold mx-[0] my-[8px]'>Get hands-on with Ghana’s rich artisanal traditions:</h3>
            <p className='mt-4 mb-4 text-[.875em] text-[#6c757d]'>
              <span>Basic Kente Weaving:</span> Learn the basics of this iconic Ghanaian textile and weave your own colorful piece.
            </p>
            <p className='mt-4 mb-4 text-[.875em] text-[#6c757d]'>
              <span>Wood Carving:</span>  Create your own unique wood carvings under the guidance of experienced craftsmen.
            </p>
            <p className='mt-4 mb-4 text-[.875em] text-[#6c757d]'>
              <span> Basket Weaving:</span> Weave beautiful and functional baskets using traditional methods.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
