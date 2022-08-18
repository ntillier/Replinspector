import styles from 'styles/Stuff.module.css'

export default function({ working }) {
  return (
    <div className={ working ? styles.working : styles.notworking }> · { working ? 'Working' : 'Not working' } </div>
  )
}