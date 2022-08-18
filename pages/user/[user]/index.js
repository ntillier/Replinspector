import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/User.module.css'
import Role from 'components/Role'
import Markdown from 'components/Markdown'
import Button from 'components/Button'
import Repl from 'components/Repl'
import Replcontainer from 'components/Replcontainer'

export default function (props) {
  return (<>
    <div className={styles.firstPart}>
      <div className={styles.banner} style={ props.coverImage ? { 'background-image':'url('+props.coverImage+')'} : {}}>
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
    <Replcontainer>
      {
        props.repls.map(i => (
          <Repl
            name={i.name}
            id={i.id}
            url={i.url}
            status={i.status}
            working={i.working}
            tags={i.tags}
            bugs={i.bugsCount}
            updates={i.updatesCount}
            tips={i.tipsCount}
            />
        ))
      }
    </Replcontainer>
  </>);
}

/*<div className={styles.pinned}>
        {
          user.pinned && 
          <iframe ref={'iframe'} src={'https://replit.com/@' + props.user + '/' + user.pinned + '?embed=true'} frameborder={0} />
        }
      </div>*/

export async function getServerSideProps({ req, params }) {
  const { user, coverImage = null } = await fetch('https://' + req.headers.host + '/api/replit/getUser?user=' + params.user).then(r => r.json());
  const { repls } = await fetch('https://' + req.headers.host + `/api/showUser?user=${user.username}`).then(r => r.json());

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
      coverImage: coverImage
    }
  }
}