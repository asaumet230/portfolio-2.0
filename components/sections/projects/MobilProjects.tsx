'use client'

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

import { MobilProjectDescription } from "."
import { IProject } from '@/interfaces';

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

interface Props {
  projects: IProject[];
}

export const MobilProjects = ({ projects }: Props) => {

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
          delay: 15000,
          disableOnInteraction: false,
        }}
        spaceBetween={40}
        pagination={{ clickable: true }}
        threshold={5}
        touchRatio={1}
        touchAngle={45}
        preventClicks={false}
        preventClicksPropagation={false}
        slideToClickedSlide={false}
        allowTouchMove={true}
        watchSlidesProgress={true}
        className='mt-4 mx-auto w-9/12 max-[1250px]:w-8/12 max-[720px]:w-10/12'>

        {
          projects.map((project) => (
            <SwiperSlide key={project.name} style={{ pointerEvents: 'auto' }}>
              <MobilProjectDescription project={project} />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </section>
  )
}

export default MobilProjects;