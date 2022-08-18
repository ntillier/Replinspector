import styles from 'styles/Stuff.module.css'

export default function ({ children }) {
  return <div className={styles.tooltip}>{ children }</div>
}