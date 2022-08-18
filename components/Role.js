import styles from 'styles/Stuff.module.css'
import Tooltip from './Tooltip'

const color = {
  'hacker': '--green',
  'content creator': '--orange',
  'moderator': '--blue-green',
  'admin': '--yellow',
  'verified': '--light-blue',
  'language jammer': '--dark-purple'
}

export default function ({ name, description }) {
  return <li 
      className={styles.role}
      style={{ background: 'var('+color[name]+')' }}>{name}<Tooltip>{ description || name }</Tooltip></li>
}