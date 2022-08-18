import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/User.module.css'
import { useRouter } from 'next/router'
import Role from 'components/Role'
import Markdown from 'components/Markdown'
import Button from 'components/Button'

export default function (props) {
  const [user, setUser] = useState({});
  const [repls, setRepls] = useState([]);
  const router = useRouter();

  /*useEffect(() => {
    fetch(`/api/showUser?user=${props.username}`)
      .then(r => r.json())
      .then(d => {
        setUser(d.user);
        setRepls(d.repls);
      });
    //console.log(iframe)
     iframe.current.contentWindow.document.querySelector("header").style.display = "none";
  }, []);*/
  
  return (<>
    <div className={styles.firstPart}>
      <div className={styles.banner} style={ props.coverImage ? {'background-image':'url(' + props.coverImage + ');'} : ''}>
        <img
          src={props.user.image}
        />
      </div>
      <div className={styles.user}>
        <h3>{props.user.fullName}</h3>
        <i>@{props.user.username}</i>
        <b>{props.user.followerCount} followers · {props.user.followCount} following</b>
        <ul>
          {
            props.user.roles.map(i => (
              <Role
                key={i.key}
                description={i.tagline}
                name={i.name}/>
            ))
          }
        </ul>
        <div>
          <Markdown 
            text={props.user.bio}
            />
        </div>
        <ol>
          {
            props.user.languages.map(i => {
              if (i.icon.startsWith('http')) {
                return <img src={i.icon} />
              } else {
                return <img src={'https://replit.com' + i.icon}/>
              }
            })
          }
        </ol>
        <Button
          onClick={() => window.open('https://replit.com/@' + props.user.username)}
          color="blue"
          >
          View profile on Replit
        </Button>
      </div>
    </div>
    <div className={styles.secondPart}>
      {
        props.repls.map(i => (
          <div onClick={() => router.push(i.url)}>
            <h2>{ i.name }</h2>
          </div>
        ))
      }
    </div>
  </>);
}

/*<div className={styles.pinned}>
        {
          user.pinned && 
          <iframe ref={'iframe'} src={'https://replit.com/@' + props.user + '/' + user.pinned + '?embed=true'} frameborder={0} />
        }
      </div>*/

export async function getServerSideProps({ req, params }) {
  const { user, coverImage } = await fetch('https://' + req.headers.host + '/api/replit/getUser?user=' + params.user).then(r => r.json());
  const { repls } = await fetch('https://' + req.headers.host + `/api/showUser?user=${params.user}`).then(r => r.json());

  const additionnal = {
    'isVerified': {
      name: 'verified',
      key: 'VERIFIED',
      tagline: 'Featured'
    },
    'isAdmin': {
      name: 'admin',
      key: 'ADMIN',
      tagline: 'admin'
    },
    'isHacker': {
      name: 'hacker',
      key: 'HACKER',
      tagline: 'hacker'
    }
  }
  
  Object.keys(additionnal).forEach(i => {
    if (user[i]) {
      user.roles.push(additionnal[i]);
    }
  });
  
  return {
    props: {
      username: params.user,
      user: user,
      repls: repls,
      coverImage: 'https://storage.googleapis.com/replit/images/1647386663523_748912c2ce0a3f2e2b695b88b37ada7d.jpeg'
    }
  }
}