import { timeAgo } from 'script/Util' 
import Markdown from './Markdown'

import styles from 'styles/Stuff.module.css'

export default function Comment({ data }) {
  return (
    <div className={styles.comment}>
      <img 
        src={data.user.image}
        />
      <b>{ data.user.username }</b>
      <i>{ timeAgo(data.timeCreated) }</i>
      <Markdown
        text={ data.body }
        />
    </div>
  );
}