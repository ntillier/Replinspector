import styles from 'styles/Repl.module.css'
import { useState, useEffect } from 'react'

import Comment from 'components/Comment'
import Button from 'components/Button'

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
        <div className={styles.comBar}>
          <Button
            color='blue'
            >
            Send a comment on Replit
          </Button>
        </div>
        {
          comments.map(i => ( <Comment data={i} /> ))
        }
        <Comment 
          data={{
            "id":376235,
            "body":"Also try: https://replit.com/@Sid72020123/Loudness-Visualizer?v=1",
            "timeCreated":"2022-08-19T04:16:55.682Z",
            "user":{
              "id":7943712,
              "username":"Sid72020123",
              "image":"https://storage.googleapis.com/replit/images/1644491745937_7b84b94fb9fb019dc97db04a648e647c.png",
              "fullName":"Siddhesh Chavan",
              "url":"/@Sid72020123"
            },
            isHidden: false
          }}
          />
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