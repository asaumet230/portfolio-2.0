
import { FaLinkedin, FaSquareXTwitter, FaSquareInstagram, FaArrowUp } from 'react-icons/fa6';


import styles from './ui.module.css';

export const SocialShareSidebar = () => {
  return (
    <div className={styles['social-share-sidebar']}>

      <p className={`rotate-90 text-xl my-10 font-semibold uppercase ${styles['social-share-message']}`}>Sigueme</p>
      <div>
        <ul>
          <li className='my-3 cursor-pointer'>
            <FaSquareInstagram size={24} />
          </li>
          <li className='my-3 cursor-pointer'>
            <FaSquareXTwitter size={24} />
          </li>
          <li className='my-3 cursor-pointer'>
            <FaLinkedin size={24} />
          </li>
        </ul>
      </div>
      <div className={ styles['social-back-top-button'] }>
        <FaArrowUp />
      </div>
    </div>
  )
}

export default SocialShareSidebar;