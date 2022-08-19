import styles from 'styles/Repl.module.css'
import { useState, useEffect } from 'react'

import Comment from 'components/Comment'
import Button from 'components/Button'
import Working from 'components/Working'

import { useAuth } from 'contexts/Auth'
import { useRouter} from 'next/router'

export default function (props) {
  const [comments, setComments] = useState([]);
  const [tips, setTips] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [updates, setUpdates] = useState([]);

  const user = useAuth();

  function previewRepl () {
    window.open(`https://replit.com/@${props.infos.user}/${props.infos.repl}?v=Infinity`)
  }

  function openWorkspace () {
    window.open(`https://replit.com/@${props.infos.user}/${props.infos.repl}`)
  }
  
  return (<>
    <div className={styles.bar}>
      <img
        src={props.repl.iconUrl}
        />
      <h1>{ props.repl.title }</h1>
      {
        user.id === props.repl.owner.id &&
          <Button
            color='blue'
            onClick={openWorkspace}
            >
            Edit in workspace
          </Button>
      }
      <Button
        color='blue'
        onClick={previewRepl}
        >
        View Repl
      </Button>
      <Working working={false}/>
    </div>
    <div className={styles.firstPart}>
      <div className={styles.iframe}>
        <iframe
          src={'https://replit.com/@' + props.infos.user + '/' + props.infos.repl + '?embed=true'} 
          frameborder={0} />
      </div>
      <div className={styles.comments}>
        <div className={styles.comBar}>
          <h2>Comments</h2>
          <Button onClick={previewRepl}>Comment</Button>
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

export async function getServerSideProps ({ params, req }) {
  const { repl } = await fetch(`https://${req.headers.host}/api/replit/getRepl?user=${params.user}&repl=${params.repl}`).then(r => r.json());
  const { data } = await fetch(`https://${req.headers.host}/api`)
  
  return {
    props: {
      infos: {
        user: params.user,
        repl: params.repl
      },
      repl: repl || null
    }
  }
}