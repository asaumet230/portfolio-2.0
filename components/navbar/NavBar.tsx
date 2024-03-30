import { PersonFillIcon } from "@primer/octicons-react";

import { NavbarLink } from "..";

import { InavbarLink } from "@/interfaces";
import { NightModeSwitch } from "../generals";


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