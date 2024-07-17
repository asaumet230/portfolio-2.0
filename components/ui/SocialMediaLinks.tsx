import {
  FaLinkedin,
  FaSquareInstagram,
  FaSquareXTwitter,
} from 'react-icons/fa6';

import { SocialMediaMessage } from './SocialMediaMessage';

interface Props {
  size: number;
  marginStyle: string;
  isNextTo: boolean;
}

export const SocialMediaLinks = ({ size, marginStyle, isNextTo }: Props) => {

  return (
    <ul className='flex justify-center'>
      <li className={`${marginStyle} group relative transition-all ease-in-out hover:scale-125`}>
        <SocialMediaMessage title='instagram' isNextTo={isNextTo} />
        <a
          href="https://www.instagram.com/pipesaumet/"
          target="_blank"
          rel="noopener noreferrer">
          <FaSquareInstagram size={size} />
        </a>
      </li>
      <li className={`${marginStyle} group relative transition-all ease-in-out hover:scale-125`}>
        <SocialMediaMessage title='twitter' isNextTo={isNextTo} />
        <a
          href="https://twitter.com/SaumetAndres"
          target="_blank"
          rel="noopener noreferrer">
          <FaSquareXTwitter size={size} />
        </a>
      </li>
      <li className={`${marginStyle} group relative transition-all ease-in-out hover:scale-125`}>
        <SocialMediaMessage title='linkedin' isNextTo={isNextTo} />
        <a
          href="https://www.linkedin.com/in/andresfelipesaumet/"
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedin size={size} />
        </a>
      </li>
    </ul>
  )
}

export default SocialMediaLinks;