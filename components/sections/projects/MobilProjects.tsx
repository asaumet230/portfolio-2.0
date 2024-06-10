'use client'

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

import { MobilProjectDescription } from "."

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

export const MobilProjects = () => {

  return (
    <section className="py-14">

      <div className="section pb-8">
        <h2 className="text-center">Aplicaciones Móviles Innovadoras</h2>
        <p className="font-light text-center first-letter:capitalize">Explora mis aplicaciones móviles, donde la innovación se encuentra con la funcionalidad para ofrecer experiencias de usuario excepcionales.</p>
      </div>


      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={40}
        pagination={{ clickable: true }}
      
        className='mt-4 mx-auto w-7/12 max-[1250px]:w-8/12 max-[640px]:w-9/12'>

        <SwiperSlide >
          <MobilProjectDescription />
        </SwiperSlide>

        <SwiperSlide >
          <MobilProjectDescription />
        </SwiperSlide>

        <SwiperSlide >
          <MobilProjectDescription />
        </SwiperSlide>

      </Swiper>

    </section>
  )
}

export default MobilProjects;