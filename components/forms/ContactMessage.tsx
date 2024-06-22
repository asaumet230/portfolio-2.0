import { MdEmail } from 'react-icons/md';

import { SocialMediaLinks } from '../ui';

export const ContactMessage = () => {
  return (
    <header>
      <h1 className="text-3xl font-bold max-[640px]:text-center">Ponte en contacto</h1>
      <p className="text-sm font-light mt-3 max-[640px]:text-center">¿Tienes una gran idea o un proyecto de marca que desarrollar y necesitas asistencia? Nos encantaría colaborar contigo. Completa el formulario de contacto y cuéntanos más sobre tu proyecto. Estamos aquí para ayudarte.</p>
      <div className="mt-12">
        <h2 className="text-lg font-bold">Email</h2>
        <ul className="mt-3">
          <li className="flex items-center">
            <MdEmail size={30} />
            <p className="ml-3">andressaumet@gmail.com</p>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-bold">Sigueme en redes</h2>
        <nav className='flex justify-start mt-4'>
          <SocialMediaLinks size={25} marginStyle={'mx-2'} />
        </nav>
      </div>
    </header>

  )
}

export default ContactMessage