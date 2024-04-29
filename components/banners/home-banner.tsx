import Image from "next/image";
import Link from "next/link";

import styles from './banners.module.css';

export const HomeBanner = () => {
  return (
    <div className="container md:flex-col lg:grid grid-cols-2 gap-2 pt-10 pb-20">

          <div className="text-center pl-0 mb-10 lg:text-left lg:pl-28">
            <p className="text-white text-xl">Hola a todos, soy</p>
            <h1 className="text-white text-4xl mt-8 mb-2">Andres Felipe Saumet</h1>
            <span className="text-white text-4xl font-bold">Desarrollador Movíl & Web</span>
            <p className="text-white font-light mt-8 mb-16">Transformando ideas en experiencias digitales excepcionales, desde sitios web hasta aplicaciones móviles, te invito a explorar mi mundo de innovación y creatividad tecnológica.</p>
            <Link href='/acerca' className={styles['banner-button']}>Mas Información</Link>
          </div>

          <div className="flex justify-center">
            <Image 
              height={450}
              width={450}
              src={'/images/2.png'} 
              alt="Andres Felipe Saumet - Desarrollador Movil & Web"/>
          </div>
      </div>
  )
}

export default HomeBanner;