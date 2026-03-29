'use client'

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import styles from './MobileProjectLayout.module.css';

interface Props {
  images: string[];
  projectName: string;
}

export const MobileProjectGallery = ({ images, projectName }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      className={`w-full pb-12 ${styles.swiperGallery}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image}>
          <div className="relative aspect-[9/16] w-full max-w-xs mx-auto rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${projectName} - captura ${index + 2}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
