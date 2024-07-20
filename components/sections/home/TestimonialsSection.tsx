'use client'

import Image from 'next/image';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

import {
    FaLinkedin,
    FaSquareInstagram,
    FaSquareXTwitter,
    FaSquareFacebook
} from 'react-icons/fa6';

import { Separator, SocialMediaMessage } from '@/components';
import { ITestimonial } from '@/interfaces';

import styles from './homeSections.module.css';


SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

interface Props {
    testimonials: ITestimonial[];
}

export const TestimonialsSection = ({ testimonials }: Props) => {

    return (

        <section className='mt-20 mb-20'>
            <div className='section'>
                <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Testimonios y Casos de Éxito:</h2>
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
                        stretch: 20,
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
                            spaceBetween: 50
                        },
                    }}
                    className='mt-8 w-full max-[1020px]:w-10/12 max-[640px]:w-11/12'>
                    {
                        testimonials.map(({ name, major, content, image, url, instagram, linkedin, twitter, facebook }) => (
                            <SwiperSlide key={name}>
                                <div className={`bg-gray-100 w-auto card-shadow mx-auto cursor-grabbing rounded-xl py-8 px-10 border border-gray-200 ${styles.testimonialCard} max-[400px]:px-5 max-[400px]:h-6/6 max-[400px]:py-4 dark:bg-[#2e374a] dark:border border-[#6e7681]`}>
                                    <Image
                                        className='rounded-full mx-auto images'
                                        width={90}
                                        height={90}
                                        src={image}
                                        alt={name}
                                        priority />
                                    <p className={`text-center text-xl font-normal mt-3  first-letter:uppercase ${styles['testimonials-major-title']}`}>{name}</p>
                                    <p className={`text-center text-xl font-bold mb-3 first-letter:uppercase ${styles['testimonials-major-title']}`}>{major}</p>
                                    <div className='flex justify-center mt-2'>
                                        {
                                            instagram && (

                                                <div className='group relative'>
                                                    <SocialMediaMessage title='Instagram' isNextTo={false} />
                                                    <a href={instagram} className='transition-all ease-in-out hover:scale-125' target='_blank' rel="noopener noreferrer">
                                                        <FaSquareInstagram size={24} className='mx-1' />
                                                    </a>
                                                </div>
                                            )
                                        }
                                        {
                                            twitter && (
                                                <div className='group relative'>
                                                    <SocialMediaMessage title='Twitter' isNextTo={false} />
                                                    <a href={twitter} className='transition-all ease-in-out hover:scale-125' target='_blank' rel="noopener noreferrer">
                                                        <FaSquareXTwitter size={24} className='mx-1' />
                                                    </a>
                                                </div>
                                            )
                                        }
                                        {
                                            linkedin && (
                                                <div className='group relative'>
                                                    <SocialMediaMessage title='Linkedin' isNextTo={false} />
                                                    <a href={linkedin} className='transition-all ease-in-out hover:scale-125' target='_blank' rel="noopener noreferrer">
                                                        <FaLinkedin size={24} className='mx-1' />
                                                    </a>
                                                </div>
                                            )
                                        }
                                        {
                                            facebook && (
                                                <div className='group relative'>
                                                    <SocialMediaMessage title='Facebook' isNextTo={false} />
                                                    <a href={facebook} className='transition-all ease-in-out hover:scale-125' target='_blank' rel="noopener noreferrer">
                                                        <FaSquareFacebook size={24} className='mx-1' />
                                                    </a>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='text-center font-semibold my-3 hover:text-secondary-color dark:hover:text-indigo-600'>
                                        <a href={url} target='_blank' rel="noopener noreferrer" >{url?.replace('https://', '').replace('/', '')}</a>
                                    </div>

                                    <p className='text-center mt-6 leading-relaxed font-light max-[400px]:mt-3 first-letter:uppercase'>{content}</p>
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