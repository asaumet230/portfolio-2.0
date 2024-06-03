'use client'

import Image from 'next/image';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';

import { Separator } from '@/app/components';
import { testimonialsData } from '@/app/helpers';


import styles from './homeSections.module.css';


SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export const TestimonialsSection = () => {

    return (

        <section className='mt-20 mb-20'>
            <div className='section'>
            <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Testimonios</h2>
                <div className="flex justify-center">
                    <Separator />
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
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    breakpoints={{
                            1025: {
                                slidesPerView: 3,
                                spaceBetween: 50 
                              },
                            1020: {
                                slidesPerView: 2,
                                spaceBetween: 50 
                              },
                        }}
                    className='mt-8 w-full max-[1020px]:w-10/12 max-[640px]:w-11/12'>
                        {
                            testimonialsData.map( ({ name, major, content, image, instagram, linkedin, twitter }) => (
                                <SwiperSlide key={name}>
                                    <div className={`bg-gray-100 w-auto mx-auto rounded-xl py-8 px-10 border border-gray-200 ${styles.testimonialCard} max-[400px]:px-5 max-[400px]:h-6/6 max-[400px]:py-4`}>
                                            <Image 
                                                className='rounded-full mx-auto images'
                                                width={90}
                                                height={90}
                                                src={image}
                                                alt={name} />
                                            <p className={`text-center text-xl font-bold mt-3 ${styles['testimonials-major-title']}`}>{major}</p>
                                            <div className='flex justify-center mt-2'>
                                                {
                                                    instagram &&  (<a href={instagram} className='transition-all ease-in-out hover:scale-125'><FaSquareInstagram size={24} className='mx-1'/></a>)
                                                }
                                                {
                                                    twitter && (<a href={twitter} className='transition-all ease-in-out hover:scale-125'> <FaSquareXTwitter size={24} className='mx-1'/></a>)
                                                }
                                                {
                                                    linkedin && ( <a href={linkedin} className='transition-all ease-in-out hover:scale-125'><FaLinkedin size={24} className='mx-1'/></a>)
                                                }
                                            </div>
                                            <p className='text-center mt-6 leading-relaxed font-light max-[400px]:mt-3'>{content}</p>
                                    </div>
                                </SwiperSlide>    
                            ))
                        }
                </Swiper>
            </div>
        </section>

    )
}

export default TestimonialsSection;