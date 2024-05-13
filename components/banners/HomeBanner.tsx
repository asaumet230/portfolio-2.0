import Image from 'next/image';

import { Separator } from '../ui';
import { HomeBannerTitle } from './';

export const HomeBanner = () => {
  return (
    <header className="pt-4">
      <div className="container grid grid-cols-2 max-[920px]:flex flex-col-reverse">

        <div className="flex flex-col justify-center text-left p-6 max-[920px]:text-center">
          <p className="font-semibold text-2xl capitalize mb-4 max-[920px]:text-xl">Hola soy Andres Felipe,</p>
          <HomeBannerTitle />

          <div className="max-[920px]:flex justify-center">
            <Separator />
          </div>

          <p className="text-lg mb-8 pr-8 max-[920px]:pr-0">Explora el arte de la tecnología a través de mi portafolio, donde mis 4 años de experiencia en desarrollo web y móvil se traducen en soluciones creativas y robustas para cada desafío digital.</p>

          <div>
            <a
              href={'/'}
              target='#'
              className="btn">Mas Información</a>
          </div>

        </div>

        <div className="bg-slate-200 flex justify-center animate__animated animate__fadeIn">
          <Image
            width={600}
            height={600}
            src="/images/andres-felipe-saumet-desarrollador-web-movil.webp"
            alt="andres-felipe-saumet" />
        </div>

      </div>
    </header>
  )
}

export default HomeBanner;