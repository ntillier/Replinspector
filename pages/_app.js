import 'styles/globals.css'

import { AuthProvider } from 'contexts/Auth'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (!user && typeof window === 'object') {
      console.log(cookie.get('user'))
      try {
        setUser(JSON.parse(cookie.get('user')));
        cookie.remove('user');
      } catch (err) {
        console.error('Error: JSON.parse()');
      }
    }
  }, []);
  
  return (
    <AuthProvider user={user}>
      <Head>
        <title>Replinspector</title>
        <meta name="viewport" content="initial-scale=1" />
      </Head>
      {
        user &&
          <Component {...pageProps} />
      }
    </AuthProvider>
  );
}

export default MyApp
