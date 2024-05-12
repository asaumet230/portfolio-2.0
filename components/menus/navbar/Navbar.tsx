import Link from 'next/link';


export const Navbar = () => {
  return (
    <div className="container">
      <div>
        

      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/trabajos'}>Trabajos</Link>
            </li>
            <li>
              <Link href={'/contactame'}>Contactame</Link>
            </li>
            <li>
              <Link href={'/blog'}>Blog</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <p>Search</p>
      </div>
    </div>
  )
}

export default Navbar;