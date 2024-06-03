import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {

  return (
    <div>
        <Link href={"/"}>
            <Image 
                priority
                height={100}
                width={170}
                src={"/images/logo-andres-saumet.webp"} 
                alt={"logo-andres-saumet"} className='images'/>
        </Link>
    </div>
  )
}

export default Logo;