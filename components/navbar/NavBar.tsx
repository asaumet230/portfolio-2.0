import { PersonFillIcon } from "@primer/octicons-react";

import { NavbarLink } from "..";

import { InavbarLink } from "@/interfaces";

interface Props {
  navbarLinks: InavbarLink[]
}

export const NavBar = ({navbarLinks}: Props) => {
  return (
    <nav>
      <ul className="flex justify-evenly"> 
        {
          navbarLinks.map((link) => (
              <NavbarLink key={link.path} {...link} />
            )
          )
        }
        <li>
          <a href="https://www.chilo.com.co/">
            <PersonFillIcon size={20} className="text-white ml-4" />
          </a>
        </li>
      </ul>
     
    </nav>
  )
}

export default NavBar;