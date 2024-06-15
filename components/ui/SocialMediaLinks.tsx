import {
  FaLinkedin,
  FaSquareInstagram,
  FaSquareXTwitter,
} from 'react-icons/fa6';

interface Props {
  size        : number;
  marginStyle : string;
}


export const SocialMediaLinks = ({ size, marginStyle }: Props) => {

  return (
    <ul className='flex justify-center'>
      <li className={`${marginStyle}  transition-all ease-in-out hover:scale-125`}>
        <a
          href="https://www.instagram.com/pipesaumet/"
          target="_blank"
          rel="noopener noreferrer">
          <FaSquareInstagram size={size} />
        </a>
      </li>
      <li className={`${marginStyle} transition-all ease-in-out hover:scale-125`}>
        <a
          href="https://twitter.com/SaumetAndres"
          target="_blank"
          rel="noopener noreferrer">
          <FaSquareXTwitter size={size} />
        </a>
      </li>
      <li className={`${marginStyle} transition-all ease-in-out hover:scale-125`}>
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