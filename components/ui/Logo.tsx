import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {

  return (
    <div>
        <Link href={"/"}>
            <Image 
                height={100}
                width={170}
                src={"/images/logo-andres-saumet.png"} 
                alt={"logo-andres-saumet"} />
        </Link>
    </div>
  )
}

export default Logo;