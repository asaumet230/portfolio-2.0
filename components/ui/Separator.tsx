import styles from './ui.module.css';

export const Separator = () => {
  return (
    <div className={`w-40 mb-8 bg-secondary-color ${styles.separator} dark:bg-indigo-600`}></div>
  )
}

export default Separator;