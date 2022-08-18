import styles from 'styles/Stuff.module.css'

export default function({ color, children, onClick }) {
  return <button className={styles['button-' + color]} onClick={onClick}>{ children }</button>
}