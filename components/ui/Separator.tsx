import styles from './ui.module.css';

export const Separator = () => {
  return (
    <div className={`w-40 my-4 bg-secondary-color ${styles.separator} dark:bg-indigo-600`}></div>
  )
}

export default Separator;