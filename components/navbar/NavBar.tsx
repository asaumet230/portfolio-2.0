import { PersonFillIcon } from "@primer/octicons-react";

import { NavbarLink, NightModeSwitch } from "..";

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
        <NightModeSwitch />
      </ul>
     
    </nav>
  )
}

export default NavBar;