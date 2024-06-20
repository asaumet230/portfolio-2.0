import Link from "next/link";
import { IoIosSearch } from "react-icons/io";


export const PostSideBar = () => {

  
  return (
    <div className="w-3/12 bg-slate-100 h-full py-6 px-8 max-[920px]:w-11/12 max-[920px]:mx-auto max-[920px]:mt-12">
      <div className="mt-3">
        <form noValidate>

          <div className="relative">
            <input
              type='text'
              placeholder='Busca Artículo'
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]" />
            <IoIosSearch
              size={20}
              color="rgb(156 163 175)"
              className="absolute bottom-3 right-4 cursor-pointer" />
          </div>
        </form>
      </div>
      <div className="mt-10">
        <h3>Categorías:</h3>
        <ul className="mt-1">
          <li className="text-sm py-1">
            <Link href={""}>Vida Como Programador</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>Desarrollo Web</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>Desarrollo Movíl</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>Tendencias y Novedades</Link>
          </li>
        </ul>
      </div>
      <div className="mt-10 mb-3">
        <h3>Últimos Artículos:</h3>
        <ul className="mt-1">
          <li className="text-sm py-2">
            <Link href={""}>5 consejos útiles para evitar el estrés programando</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>Mejores prácticas para escribir código limpio en TypeScript</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>El futuro de Flutter: hacia dónde se dirige el desarrollo móvil</Link>
          </li>
          <li className="text-sm py-1">
            <Link href={""}>Tendencias actuales en el desarrollo web en 2024</Link>
          </li>
        </ul>
      </div>
      
    </div>
  )
}

export default PostSideBar;