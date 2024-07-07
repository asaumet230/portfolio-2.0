'use client'

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

import WebProjectDescription from "./WebProjectDescription";
import { IProject } from '@/interfaces';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

interface Props {
  projects: IProject[];
}

export const WebProjects = ({ projects }: Props) => {
  return (
    <section className="py-12 bg-slate-100">

      <div className="section pb-8">
        <h2 className="text-center">Soluciones Web Avanzadas</h2>
        <p className="font-light text-center first-letter:capitalize">mis soluciones web estan diseñadas para maximizar la usabilidad y la eficacia. Cada proyecto destaca por su enfoque innovador y técnico en el desarrollo web.</p>
      </div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        spaceBetween={40}
        pagination={{ clickable: true }}
        breakpoints={{
          1200: {
            slidesPerView: 3,
            spaceBetween: 50
          },
          720: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        className='mt-6 w-9/12 max-[640px]:w-8/12'>

        {
          projects.map((project) => (
            <SwiperSlide key={project.name} >
              <WebProjectDescription project={project}/>
            </SwiperSlide>

          ))
        }
      </Swiper>
    </section>
  )
}

export default WebProjects;