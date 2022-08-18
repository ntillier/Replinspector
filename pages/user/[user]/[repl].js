import styles from 'styles/Repl.module.css'
import { useState, useEffect } from 'react'

export default function (props) {
  const [comments, setComments] = useState([]);
  const [tips, setTips] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [updates, setUpdates] = useState([]);
  
  return (<>
    <div className={styles.firstPart}>
      <div className={styles.iframe}>
        <iframe
          src={'https://replit.com/@' + props.infos.user + '/' + props.infos.repl + '?embed=true'} 
          frameborder={0} />
      </div>
      <div className={styles.comments}>
        {
          comments.map(i => ( <Comment data={i} /> ))
        }
      </div>
    </div>
  </>)
}

export function getServerSideProps ({ params, req }) {
  return {
    props: {
      infos: {
        user: params.user,
        repl: params.repl
      }
    }
  }
}