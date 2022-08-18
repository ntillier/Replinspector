import Link from 'next/link'
import Role from './Role'
import Working from './Working'
import styles from 'styles/Stuff.module.css'
import { useRouter } from 'next/router'

const Status = [
  {
    label: 'Starting',
    display: 'I started this project recently.'
  },
  {
    label: 'In progress',
    display: 'I am making progress in this project.'
  },
  {
    label: 'Almost done',
    display: 'It works, but I need to polish some things.'
  },
  {
    label: 'Published',
    display: 'This project is finished and ready to use'
  },
  {
    label: 'Improving',
    display: 'This project was finished, but there are a few bugs I need to resolve.'
  }
];

export default function({ name, tags, id, url, status, working, tips, bugs, updates }) {
  const router = useRouter();
  function changePage () {
    router.push(url);
  }
  return (
    <ul onClick={changePage} className={styles.repl}>
      <li><h2>{ name }</h2> <Working working={ working }/> </li>
      {
        tags.length > 0 &&
          <li>
            {
              tags.map(i => ( <Role key={i} name={i} description={'I have the following tag: ' + i} /> ))
            }
          </li>
      }
      <li>
        <b>{ updates } updates · { tips } tips · { bugs } bugs</b>
        <Role 
          name={Status[status].label}
          description={Status[status].display}
          />
      </li>
    </ul>
  )
}